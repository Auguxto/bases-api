import jwt from 'jsonwebtoken';
import { Response } from 'express';

import prismaClient from '../../prisma';

import { decrypt } from '../../lib/crypt';

import { Session } from '../../@types/types';

import AppError from '../../error/AppError';

class CreateSessionService {
  async execute({ username, password }: Session, response: Response) {
    if (!username || !password) throw new AppError('Parametros invalidos');

    const user = await prismaClient.user.findUnique({
      where: { username },
    });

    if (!user) throw new AppError('Usuario nao encontrado', 404);

    const password_match = password === decrypt(user.password, process.env.SECRET_ENCRYPT);

    if (!password_match) throw new AppError('Senha invalida', 401);

    const token = jwt.sign({}, process.env.SECRET_JWT, {
      expiresIn: '1d',
      subject: user.id,
    });

    const cookieOptions = {
      maxAge: 86400,
      httpOnly: true,
    };

    response.cookie('sid-bases', token, { ...cookieOptions, sameSite: 'strict' });

    return token;
  }
}

export default CreateSessionService;
