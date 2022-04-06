import prismaClient from '../../prisma';

import AppError from '../../error/AppError';

class DeleteUserService {
  async execute(id: string) {
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
