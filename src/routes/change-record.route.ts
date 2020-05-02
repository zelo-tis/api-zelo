import { Router } from 'express';
import Controller from '../controllers/change-record.controller';

const router = Router();

router
  .route(['/'])
  .get((req, res) => Controller.getAll(req, res));

router
  .route(['/generate'])
  .post((req, res) => Controller.generateChangeRecords(req, res));



export default router;
