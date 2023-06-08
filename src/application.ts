import {CatchException, LoggerKind} from "./decorators";

class CreateBillError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CreateBillError'
  }
}

@LoggerKind('Application')
class CreateBillController {

  @CatchException({
    onError: err => {
      return {
        statusCode: 500,
        error: err.message,
      }
    }
  })
  public exec(value: any): any {
    if (typeof value !== 'number') {
      throw new CreateBillError(`${typeof value} is not assign to "value" parameter`)
    }

    return {
      statusCode: 201
    }
  }
}

(async () => {
  const controller = new CreateBillController()
  const res = await controller.exec('2.2')

  console.log('\n\n')
  console.log(res)
})()