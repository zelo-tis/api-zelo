import { Router } from 'express';
import Controller from '../controllers/user.controller';

const router = Router();

router
  .route(['/'])
  .get((req, res) => Controller.getAll(req, res));


export default router;
