import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Middleware global, afeta apenas as rotas
// seguintes a ele

routes.use(authMiddleware);

routes.put('/users', UserController.update);

// Middleware local
// routes.put('/users', authMiddleware, UserController.update);

export default routes;
