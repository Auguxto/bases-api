import { Router } from 'express';

import CreateSessionController from '../controller/session/create';

const sessionRoutes = Router();

sessionRoutes.post('/', new CreateSessionController().handle);

export default sessionRoutes;
