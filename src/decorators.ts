import {Kind} from "./common";
import {Logger} from "./logger";

type Target = { new(...args: any[]): {} }

type CatchExceptionOptions = {
  onError: (err: InstanceType<typeof Error>) => unknown
}

export function LoggerKind<T extends Target>(kind: Kind) {
  return function (target: T) {
    Object.defineProperty(target.prototype, '__kind', {
      configurable: true,
      value: kind
    })
  }
}

export function CatchException(options: CatchExceptionOptions) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value

    descriptor.value = async function (...args: any[]) {
      try {
        return await method.apply(this, args)
      } catch (e) {
        const trigger = {
          name: this.constructor.name,
          method_name: propertyKey,
          params: args
        }

        const err = {
          stack: e.stack,
          name: e.name,
          message: e.message,
          kind: this.__kind
        }

        Logger.error(trigger, err)

        const handleError = options.onError.bind(this)

        return handleError(e)
      }
    }
  }
}