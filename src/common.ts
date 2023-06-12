import {ServerResponse} from "http";

export type Kind = "Domain" | "Application" | "Infra"

export class HandleResponse {
  private static instance: HandleResponse
  private res: ServerResponse

   constructor(res: ServerResponse) {
    this.res = res

    this.res.setHeader('Content-type', 'application/json')
  }

  public internalError(error: unknown, status = 500): ServerResponse {
    this.res.statusCode = status

    return this.res.end(JSON.stringify(error))
  }

  public created(body?: unknown, status = 201): ServerResponse {
    this.res.statusCode = status

    return this.res.end(body && JSON.stringify(body))
  }
}