import { Request } from 'express';

import prismaClient from '../../prisma';

import AppError from '../../error/AppError';

class DeleteTowerService {
  async execute(id: string, request: Request) {
    const logged_user = await prismaClient.user.findUnique({
      where: { id: request.user_id },
    });

    if (!logged_user.admin) throw new AppError('Não autorizado', 401);

    const tower = await prismaClient.tower.findUnique({
      where: { id },
    });

    if (!tower) throw new AppError('Torre não encontrada');

    await prismaClient.tower.delete({
      where: { id },
    });

    return 'Torre removida';
  }
}

export default DeleteTowerService;
