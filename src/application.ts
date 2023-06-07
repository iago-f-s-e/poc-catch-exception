import {CatchException, LoggerKind} from "./decorators";

class CreateBillError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CreateBillError'
  }
}

@LoggerKind('Application')
class CreateBillController {

  @CatchException()
  public exec(value: any): any {
    if (typeof value !== 'number') {
      throw new CreateBillError(`${typeof value} is not assign to "value" parameter`)
    }

    return {
      statusCode: 201
    }
  }
}

const controller = new CreateBillController()
controller.exec('2.2')