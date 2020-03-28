export interface ErrorInterface {
  status: number;
  errorCode?: string;
  message?: string;
  error: object[] | object;
}
