import { Router } from 'express';
import Controller from '../controllers/dashboard.controller';

const router = Router();

router
  .route(['/'])
  .get((req, res) => Controller.getListRegistry(req, res));

router
  .route(['/late'])
  .get((req, res) => Controller.getLate(req, res));

router
  .route(['/now'])
  .get((req, res) => Controller.getNow(req, res));


export default router;
