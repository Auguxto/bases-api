import { Request, Response } from 'express';

import CreateUserService from '../../services/user/create';

import { User } from '../../@types/types';

class CreateUserController {
  async handle(request: Request, response: Response) {
    const params: User = request.body;

    const service = new CreateUserService();
    const user = await service.execute(params);

    return response.json({ user });
  }
}

export default CreateUserController;
