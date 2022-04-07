import { Router } from 'express';

import CreatePermissionController from '../controller/permission/create';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const permissionRoutes = Router();

permissionRoutes.post('/register', ensureAuthenticated, new CreatePermissionController().handle);

export default permissionRoutes;
