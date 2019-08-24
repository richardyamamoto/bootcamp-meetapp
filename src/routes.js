import { Router } from 'express';
import UserController from './app/controller/UserController';

import './database';

const routes = new Router();

routes.post('/users', UserController.store);

export default routes;
