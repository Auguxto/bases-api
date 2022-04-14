import { Request } from 'express';
import { Controller } from 'unifi-client';

import prismaClient from '../../prisma';

import { decrypt } from '../../lib/crypt';

import AppError from '../../error/AppError';

class GetTowerStatusService {
  async execute(id: string, request: Request) {
    const logged_user = await prismaClient.user.findUnique({
      where: { id: request.user_id },
    });

    if (!logged_user.admin) throw new AppError('Não autorizado', 401);

    const tower = await prismaClient.tower.findUnique({
      where: { id },
    });

    if (!tower) throw new AppError('Torre não encontrada', 404);

    if (tower.mikrotik) return new AppError('Status mikrotik não disponível', 404);

    const response = fetch(
      `http://${tower.ip}:80/api/devicegroup/All%20Devices?auth.user=${tower.username}&auth.password=${decrypt(
        tower.password,
        process.env.SECRET_ENCRYPT,
      )}`,
    );

    console.log(response);

    return response;
  }
}

export default GetTowerStatusService;
