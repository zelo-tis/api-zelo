import { Router, Request, Response } from 'express';
import multer from 'multer';
import RequestController from '../controllers/request.controller';
import CommentsController from '../controllers/comments.controller';
import * as RequestValidation from '../common/validations/request.validation';

const router = Router();
const upload = multer();

router.post('/', RequestValidation.insert, (req: Request, res: Response) => RequestController.insert(req, res));

router.put('/:id', RequestValidation.update, (req: Request, res: Response) => RequestController.update(req, res));

router.get('/', (req: Request, res: Response) => RequestController.getAll(req, res));

router.get('/:id', (req: Request, res: Response) => RequestController.getOne(req, res));

router.get('/:request_id/comments', (req: Request, res: Response) => CommentsController.getAll(req, res));

router.post('/:request_id/comments', (req: Request, res: Response) => CommentsController.insert(req, res));

router.delete('/:request_id/comments/:id', (req: Request, res: Response) => CommentsController.delete(req, res));

router.post('/:id/picture', upload.array('pictures'), (req: Request, res: Response) => RequestController.savePictures(req, res));

router.delete('/picture/:id', (req: Request, res: Response) => RequestController.deletePicture(req, res));

export default router;
