import { Request, Response } from 'express';

import UpdateUserService from '../../services/user/update';

import { User } from '../../@types/types';

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const params: User = request.body;
    const { id } = request.params;

    const service = new UpdateUserService();
    const user = await service.execute(id, request, params);

    return response.json({ user });
  }
}

export default UpdateUserController;
