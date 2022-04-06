import validator from 'validator';

import prismaClient from '../../prisma';

import { encrypt } from '../../lib/crypt';

import { User } from '../../@types/types';

import AppError from '../../error/AppError';

class CreateUserService {
  async execute({ name, username, password }: User) {
    if (!name || !username || !password) throw new AppError('Parametros invalidos');

    let user = await prismaClient.user.findUnique({
      where: { username },
    });

    if (user) throw new AppError('Usuario ja registrado', 401);

    const is_strong_password = validator.isStrongPassword(password, {
      minLength: 4,
      minNumbers: 1,
      minSymbols: 1,
    });

    if (!is_strong_password) throw new AppError('Senha fraca', 401);

    const password_hash = encrypt(password, process.env.SECRET_ENCRYPT);

    user = await prismaClient.user.create({
      data: {
        name,
        username,
        password: password_hash,
      },
    });

    delete user.password;

    return user;
  }
}

export default CreateUserService;
