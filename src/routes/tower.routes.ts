import { Router } from 'express';

import CreateTowerController from '../controller/tower/create';
import DeleteTowerController from '../controller/tower/delete';
import UpdateTowerController from '../controller/tower/update';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const towerRoutes = Router();

towerRoutes.post('/register', ensureAuthenticated, new CreateTowerController().handle);
towerRoutes.delete('/delete/:id', ensureAuthenticated, new DeleteTowerController().handle);
towerRoutes.patch('/update/:id', ensureAuthenticated, new UpdateTowerController().handle);

export default towerRoutes;
