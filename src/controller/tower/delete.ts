import { Request, Response } from 'express';

import DeleteTowerService from '../../services/tower/delete';

class DeleteTowerController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const service = new DeleteTowerService();
    const result = await service.execute(id, request);

    return response.json({ message: result });
  }
}

export default DeleteTowerController;
