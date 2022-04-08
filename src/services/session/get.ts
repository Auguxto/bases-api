import { Request } from 'express';

import AppError from '../../error/AppError';

class GetCurrentSessionService {
  async execute(request: Request) {
    const token = request.cookies['sid-bases'];

    if (!token) throw new AppError('Nenhuma sessão foi encontrada');

    return token;
  }
}

export default GetCurrentSessionService;
