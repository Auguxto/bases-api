import { Request } from 'express';

import prismaClient from '../../prisma';

import { Tower } from '../../@types/types';

import AppError from '../../error/AppError';
import { encrypt } from '../../lib/crypt';

class UpdateTowerService {
  async execute(id: string, request: Request, { ip, name, username, password, vpn, mikrotik, city }: Tower) {
    const logged_user = await prismaClient.user.findUnique({
      where: { id: request.user_id },
    });

    if (!logged_user.admin) throw new AppError('Não autorizado', 401);

    let tower = await prismaClient.tower.findUnique({
      where: { id },
    });

    if (!tower) throw new AppError('Torre não encontrada', 404);

    if (ip && ip !== tower.ip) {
      const tower_exists = await prismaClient.tower.findUnique({
        where: { ip },
      });

      if (tower_exists) throw new AppError('IP ja registrado em outra torre', 401);
    }

    if (name && name !== tower.name) {
      const tower_exists = await prismaClient.tower.findUnique({
        where: { name },
      });

      if (tower_exists) throw new AppError('Nome ja registrado em outra torre', 401);
    }

    const password_hash = password ? encrypt(password, process.env.SECRET_ENCRYPT) : tower.password;

    const is_vpn = vpn !== undefined ? (vpn === true ? true : false) : tower.vpn;
    const is_mk = mikrotik !== undefined ? (mikrotik === true ? true : false) : tower.mikrotik;

    tower = await prismaClient.tower.update({
      where: { id },
      data: {
        ip: ip || tower.ip,
        name: name || tower.name,
        username: username || tower.username,
        password: password_hash,
        vpn: is_vpn,
        mikrotik: is_mk,
        city: city
          ? {
              connectOrCreate: {
                where: { name: city },
                create: { name: city },
              },
            }
          : {
              connect: {
                id: tower.cityId,
              },
            },
      },
      include: {
        city: true,
      },
    });

    delete tower.password;
    delete tower.cityId;

    return tower;
  }
}

export default UpdateTowerService;
