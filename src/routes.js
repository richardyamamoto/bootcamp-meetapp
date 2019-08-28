import { Router } from 'express';
import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';
import authMiddleware from './app/middlewares/auth';

import './database';

const routes = new Router();

// Users
routes.post('/users', UserController.store);

// Session
routes.post('/session', SessionController.store);

// Middlewares
routes.use(authMiddleware);

// User in Session
routes.put('/users', UserController.update);
// # Upload file
routes.put('/users/:userId/uploads', FileController.store);
export default routes;
