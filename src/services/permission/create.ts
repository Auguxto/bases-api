import { Request } from 'express';

import prismaClient from '../../prisma';

import { Permission } from '../../@types/types';

import AppError from '../../error/AppError';

class CreatePermissionService {
  async execute(request: Request, { permission, description }: Permission) {
    const logged_user = await prismaClient.user.findUnique({
      where: { id: request.user_id },
    });

    if (!logged_user.admin) throw new AppError('Somente administradores podem registrar permissoes', 401);

    if (!permission || !description) throw new Error('Parametros invalidos');

    const permission_exists = await prismaClient.permission.findUnique({
      where: { permission },
    });

    if (permission_exists) throw new AppError('Permissao ja registrada');

    const new_permission = await prismaClient.permission.create({
      data: {
        permission,
        description,
      },
    });

    return new_permission;
  }
}

export default CreatePermissionService;
