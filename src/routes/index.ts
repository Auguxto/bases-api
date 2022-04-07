import { Router } from 'express';

import userRoutes from './user.routes';
import sessionRoutes from './session.routes';
import permissionRoutes from './permission.routes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/session', sessionRoutes);
routes.use('/permission', permissionRoutes);

export default routes;
