import {CatchException, LoggerKind} from "./decorators";
import {HandleResponse} from "./common";

class CreateBillError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CreateBillError'
  }
}

@LoggerKind('Application')
export class CreateBillController {
  constructor(private readonly handleResponse: HandleResponse) {}

  @CatchException({
    onError: function (err) {
      return (this as CreateBillController).handleResponse.internalError( {
        error: err.message,
      })
    }
  })
  public exec(body: {value: number}) {
    if (typeof body.value !== 'number') {
      throw new CreateBillError(`${typeof body} is not assign to "value" parameter`)
    }

    return this.handleResponse.created( {message: 'ok'})
  }
}