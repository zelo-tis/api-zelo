import { Router, Request, Response } from 'express';
import Controller from '../controllers/patient.controller';

const router = Router();

router.get('/', (req: Request, res: Response) => Controller.getAll(req, res));

router.get('/:id', (req: Request, res: Response) => Controller.getOne(req, res));

router.post('/', (req: Request, res: Response) => Controller.insert(req, res));

router.put('/:id',  (req: Request, res: Response) => Controller.update(req, res));

router.delete('/:id', (req: Request, res: Response) => Controller.delete(req, res));

export default router;
