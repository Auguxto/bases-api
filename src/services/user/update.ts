import validator from 'validator';
import { Request } from 'express';

import prismaClient from '../../prisma';

import { encrypt } from '../../lib/crypt';

import { User } from '../../@types/types';

import AppError from '../../error/AppError';

class UpdateUserService {
  async execute(id: string, request: Request, { name, username, password }: User) {
    const logged_user = await prismaClient.user.findUnique({
      where: { id: request.user_id },
    });

    let user = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!user) throw new AppError('Usuario não encontrado', 404);

    if (logged_user.id !== user.id) throw new AppError('Você não tem permissão para alterar este usuário', 403);

    if (username && username !== user.username) {
      const user_exists = await prismaClient.user.findUnique({
        where: { username },
      });

      if (user_exists) throw new AppError('Username ja em uso', 401);
    }

    if (password) {
      const is_strong_password = validator.isStrongPassword(password, {
        minLength: 4,
        minNumbers: 1,
        minSymbols: 1,
      });

      if (!is_strong_password) throw new AppError('Senha fraca', 401);
    }

    const password_hash = password ? encrypt(password, process.env.SECRET_ENCRYPT) : user.password;

    user = await prismaClient.user.update({
      where: { id },
      data: {
        name: name || user.name,
        username: username || user.username,
        password: password_hash,
      },
    });

    delete user.password;

    return user;
  }
}

export default UpdateUserService;
