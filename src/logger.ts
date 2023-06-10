import {Kind} from "./common";

type Trigger = {
  name: string
  method_name: string
  params: any | any[]
}

type Err = {
  stack: string
  name: string
  message: string
  kind: Kind
}

export class Logger {
  public static error(trigger: Trigger, err: Err) {
    process.stderr.write(JSON.stringify({
      timestamp: new Date().toISOString(),
      logger: trigger,
      error: err
    }, null, 2), 'utf-8')
  }
}