import { Router } from 'express';

import userRoutes from './user.routes';
import sessionRoutes from './session.routes';
import towerRoutes from './tower.routes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/session', sessionRoutes);
routes.use('/tower', towerRoutes);

export default routes;
