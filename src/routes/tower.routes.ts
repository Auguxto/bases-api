import { Router } from 'express';

import CreateTowerController from '../controller/tower/create';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const towerRoutes = Router();

towerRoutes.post('/register', ensureAuthenticated, new CreateTowerController().handle);

export default towerRoutes;
