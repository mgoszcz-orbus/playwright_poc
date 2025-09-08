import { AuthService } from "./authService";

export interface IApi<TCreateBody, TCreatedObject> {
  get(params?: any): Promise<TCreatedObject[]>;
  post(body: TCreateBody): Promise<TCreatedObject>;
  delete(id: string): Promise<void>;
}

export abstract class Api<TCreateBody, TCreatedObject>
  implements IApi<TCreateBody, TCreatedObject>
{
  protected baseUrl: string;
  protected auth: AuthService;

  constructor(baseUrl: string, auth: AuthService) {
    this.baseUrl = baseUrl;
    this.auth = auth;
  }

  abstract get(params?: any): Promise<TCreatedObject[]>;
  abstract post(body: TCreateBody): Promise<TCreatedObject>;
  abstract delete(id: string): Promise<void>;
}
