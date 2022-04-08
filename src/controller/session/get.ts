import { Request, Response } from 'express';

import GetCurrentSessionService from '../../services/session/get';

class GetCurrentSessionController {
  async handle(request: Request, response: Response) {
    const service = new GetCurrentSessionService();
    const token = await service.execute(request);

    return response.json({ token });
  }
}

export default GetCurrentSessionController;
