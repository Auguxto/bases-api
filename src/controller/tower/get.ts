import { Request, Response } from 'express';
import GetTowerStatusService from '../../services/tower/get';

class GetTowerStatusController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const service = new GetTowerStatusService();
    const result = await service.execute(id, request);

    return response.json({ result });
  }
}

export default GetTowerStatusController;
