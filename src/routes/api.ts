import { Router } from 'express';
import { userController } from '../contorllers';

const userRoute = Router();

userRoute.get('/', userController.getUsers);
userRoute.get('/:id', userController.getUserById);
userRoute.post('/', userController.create);
userRoute.put('/:id', userController.update);
userRoute.delete('/:id', userController.remove);

export const userRouter = userRoute;
