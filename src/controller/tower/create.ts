import { Request, Response } from 'express';

import CreateTowerService from '../../services/tower/create';

import { Tower } from '../../@types/types';

class CreateTowerController {
  async handle(request: Request, response: Response) {
    const params: Tower = request.body;

    const service = new CreateTowerService();
    const tower = await service.execute(request, params);

    return response.json({ tower });
  }
}

export default CreateTowerController;
