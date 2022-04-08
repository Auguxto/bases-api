import { Router } from 'express';

import CreateSessionController from '../controller/session/create';
import GetCurrentSessionController from '../controller/session/get';

const sessionRoutes = Router();

sessionRoutes.post('/', new CreateSessionController().handle);
sessionRoutes.get('/', new GetCurrentSessionController().handle);

export default sessionRoutes;
