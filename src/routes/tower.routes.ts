import { Router } from 'express';

import CreateTowerController from '../controller/tower/create';
import DeleteTowerController from '../controller/tower/delete';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const towerRoutes = Router();

towerRoutes.post('/register', ensureAuthenticated, new CreateTowerController().handle);
towerRoutes.delete('/delete/:id', ensureAuthenticated, new DeleteTowerController().handle);

export default towerRoutes;
