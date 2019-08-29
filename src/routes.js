import { Router } from 'express';
import Multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';
import authMiddleware from './app/middlewares/auth';
import FileController from './app/controller/FileController';
import MeetupController from './app/controller/MeetupController';
import SubscriptionController from './app/controller/SubscriptionController';
import OrganizingController from './app/controller/OrganizingController';

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
// # Meetups
// ## Organizing Meetups
routes.get('/organizing', OrganizingController.index);
// ## Create Meetup
routes.post('/meetups', MeetupController.store);
// ## Update Meetup
routes.put('/meetups/:id', MeetupController.update);
// ## List Meetup
routes.get('/meetups', MeetupController.index);
// ## Delete Meetup
routes.delete('/meetups/:id', MeetupController.delete);
// ## Subcription
routes.post('/meetups/:meetupId/subscriptions', SubscriptionController.store);
// ## Subscribed list
routes.get('/meetups/subscriptions', SubscriptionController.index);
// ## Upload file
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
