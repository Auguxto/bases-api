import { Router } from 'express';

import CreateUserController from '../controller/user/create';
import DeleteUserController from '../controller/user/delete';
import UpdateUserController from '../controller/user/update';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userRoutes = Router();

userRoutes.post('/register', new CreateUserController().handle);
userRoutes.patch('/update/:id', ensureAuthenticated, new UpdateUserController().handle);
userRoutes.delete('/delete/:id', ensureAuthenticated, new DeleteUserController().handle);

export default userRoutes;
