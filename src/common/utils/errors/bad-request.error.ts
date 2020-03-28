export class BadRequestError extends Error {
  public errorCode = 'BadRequestError';

  public status = 400;

  public error: any;

  constructor(message: string = '', error?: any) {
    super(message);

    this.error = error;
  }
}
