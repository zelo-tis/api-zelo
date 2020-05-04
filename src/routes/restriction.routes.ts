import { Router } from 'express';
import Controller from '../controllers/restriction.controller';

const router = Router();

router
  .route(['/list'])
  .get((req, res) => Controller.getList(req, res));


export default router;
