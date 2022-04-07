import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import prismaClient from '../prisma';

import AppError from '../error/AppError';

async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) throw new AppError('Não autorizado', 401);

  const [, token] = authToken.split(' ');

  try {
    const { sub } = jwt.verify(token, process.env.SECRET_JWT) as { sub: string };

    const user = await prismaClient.user.findUnique({
      where: { id: sub },
    });

    if (!user) throw new AppError('Não autorizado', 401);

    request.user_id = sub;

    return next();
  } catch {
    throw new AppError('Não autorizado', 401);
  }
}

export default ensureAuthenticated;
