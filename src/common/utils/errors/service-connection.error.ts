export class ServiceConnectionError extends Error {
  public errorCode = 'ServiceConnectionError';

  public status = 500;

  public error: any;

  constructor(message: string = '', error?: any) {
    super(message);

    this.error = error;
  }
}
