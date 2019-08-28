import { Router } from 'express';
import Multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';
import authMiddleware from './app/middlewares/auth';
import FileController from './app/controller/FileController';
import MeetupController from './app/controller/MeetupController';

import './database';
// Multer upload method
const upload = Multer(multerConfig);

const routes = new Router();

// Users
routes.post('/users', UserController.store);

// Session
routes.post('/session', SessionController.store);

// Middlewares
routes.use(authMiddleware);

// User in Session
routes.put('/users', UserController.update);
// # Create Meetup
routes.post('/meetups', MeetupController.store);
// # Upload file
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
