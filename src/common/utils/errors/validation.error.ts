export class ValidationError extends Error {
  public errorCode = 'ValidationError';

  public status = 400;

  public error: any;

  constructor(message: string = '', error?: any) {
    super(message);

    this.error = error;
  }
}
