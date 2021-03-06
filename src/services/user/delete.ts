import { Request } from 'express';

import prismaClient from '../../prisma';

import AppError from '../../error/AppError';

class DeleteUserService {
  async execute(id: string, request: Request) {
    const logged_user = await prismaClient.user.findUnique({
      where: { id: request.user_id },
    });

    if (!logged_user.admin) throw new AppError('Não autorizado', 401);

    const user = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!user) throw new AppError('Usuario não encontrado');

    await prismaClient.user.delete({
      where: { id },
    });

    return 'Usuario removido';
  }
}

export default DeleteUserService;
