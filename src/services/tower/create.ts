import { Request } from 'express';

import prismaClient from '../../prisma';

import { Tower } from '../../@types/types';

import AppError from '../../error/AppError';
import { encrypt } from '../../lib/crypt';

class CreateTowerService {
  async execute(request: Request, { ip, name, username, password, vpn, mikrotik, city }: Tower) {
    const logged_user = await prismaClient.user.findUnique({
      where: { id: request.user_id },
    });

    if (!logged_user.admin) throw new AppError('Não autorizado', 401);

    if (!ip || !name || !username || !password || !city) throw new AppError('Parametros invalidos');

    const towers = await prismaClient.tower.findMany({
      where: {
        OR: [
          {
            ip,
          },
          {
            name,
          },
        ],
      },
    });

    if (towers.length >= 1) throw new AppError('Torre ja registrada com o mesmo IP ou Nome', 400);

    const password_hash = encrypt(password, process.env.SECRET_ENCRYPT);

    const tower = await prismaClient.tower.create({
      data: {
        ip,
        name,
        username,
        password: password_hash,
        vpn: vpn || false,
        mikrotik: mikrotik || false,
        city: {
          connectOrCreate: {
            where: { name: city },
            create: { name: city },
          },
        },
      },
      include: {
        city: true,
      },
    });

    delete tower.password;

    return tower;
  }
}

export default CreateTowerService;
