import { Router } from 'express';
import Controller from '../controllers/dashboard.controller';

const router = Router();

router
  .route(['/'])
  .get((req, res) => Controller.getListRegistry(req, res));


export default router;
