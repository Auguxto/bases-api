import { Request, Response } from 'express';

import CreateSessionService from '../../services/session/create';

import { Session } from '../../@types/types';

class CreateSessionController {
  async handle(request: Request, response: Response) {
    const params: Session = request.body;

    const service = new CreateSessionService();
    const user = await service.execute(params, response);

    return response.json({ user });
  }
}

export default CreateSessionController;
