import {Request, Response, Router} from 'express';
import Controller from '../controllers/change-record.controller';

const router = Router();

router.get('/', (req: Request, res: Response) => Controller.getAll(req, res));

router.get('/:id', (req: Request, res: Response) => Controller.getOne(req, res));

router.post('/', (req: Request, res: Response) => Controller.insert(req, res));

router.put('/:id',  (req: Request, res: Response) => Controller.update(req, res));

router.delete('/:id', (req: Request, res: Response) => Controller.delete(req, res));

router
  .route(['/generate'])
  .post((req, res) => Controller.generateChangeRecords(req, res));

router
  .route(['/next-records'])
  .delete((req, res) => Controller.deleteNextRecords(req, res));


export default router;
