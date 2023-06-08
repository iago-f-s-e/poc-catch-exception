type Kind = "Domain" | "Application" | "Infra"

type Target =  { new(...args: any[]): {} }

type CatchExceptionOptions = {
  onError: (err: InstanceType<typeof Error>) => unknown
}

export function LoggerKind<T extends  Target>(kind: Kind) {
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
        console.error(JSON.stringify({
          timestamp: new Date().toISOString(),
          logger: {
            name: target.name,
            method_name: propertyKey,
            params: args
          },
          error: {
            stack: e.stack,
            name: e.name,
            message: e.message,
            kind: this.__kind
          }
        }, null, 2))

        return options.onError(e)
      }
    }
  }
}