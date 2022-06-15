export class ControllerError {
  msg: string;
  httpCode: number;

  constructor(msg: string, httpCode: number) {
    this.msg = msg;
    this.httpCode = httpCode;
  }
}
