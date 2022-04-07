import { Request, Response } from 'express';

import CreatePermissionService from '../../services/permission/create';

import { Permission } from '../../@types/types';

class CreatePermissionController {
  async handle(request: Request, response: Response) {
    const params: Permission = request.body;

    const service = new CreatePermissionService();
    const permission = await service.execute(request, params);

    return response.json({ permission });
  }
}

export default CreatePermissionController;
