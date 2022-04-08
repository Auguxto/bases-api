import { Request, Response } from 'express';

import UpdateTowerService from '../../services/tower/update';

import { Tower } from '../../@types/types';

class UpdateTowerController {
  async handle(request: Request, response: Response) {
    const params: Tower = request.body;
    const { id } = request.params;

    const service = new UpdateTowerService();
    const tower = await service.execute(id, request, params);

    return response.json({ tower });
  }
}

export default UpdateTowerController;
