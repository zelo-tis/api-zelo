export class NotFoundError extends Error {
  public errorCode = 'NotFoundError';

  public status = 404;

  public error: any;

  constructor(message: string = '', error?: any) {
    super(message);

    this.error = error;
  }
}
