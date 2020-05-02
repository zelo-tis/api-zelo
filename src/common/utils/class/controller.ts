import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ValidationError, BadRequestError } from '../errors';
import { ErrorInterface } from '../../interfaces/error.interface';

export default abstract class Controller {

  public validateRequest(req: Request) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ValidationError('', errors.array({ onlyFirstError: true }));
    }
  }

  public sendError(res: Response, error: any) {
    const response: ErrorInterface = {
      errorCode: error.errorCode || 'Error',
      status: error.status || 500,
      message: error.message,
      error: error.error
    };

    if (error.sqlState) {
      response.error = { ...error };
      delete response.message;
    }

    res.status(response.status).json(response);
  }

  public getIdFromRequestParams(req: Request) {
    const { id } = req.params;
    if (!id || isNaN(+id)) throw new BadRequestError('Invalid value to param \'id\'');

    return +id;
  }
}
