import { Router } from 'express';
import Controller from '../controllers/change-record.controller';

const router = Router();

router
  .route(['/generate'])
  .get((req, res) => Controller.generateChangeRecords(req, res));


export default router;
