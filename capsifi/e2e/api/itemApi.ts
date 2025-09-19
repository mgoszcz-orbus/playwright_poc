import { ItemBody, ItemResponse } from "../types/item";
import { Api } from "./api";
import { AuthenticationApi } from "./authenticationApi";

export class ItemApi extends Api<ItemBody, ItemResponse> {
  constructor(authenticationApi: AuthenticationApi) {
    super("https://gateway-develop.capsifi.com", "/items", authenticationApi);
  }

  protected buildItemUrl(id: string): string {
    return `${this.basePath}/itemId=${id}`;
  }

  async get(id: string): Promise<ItemResponse> {
    throw new Error("GET method is not available for /items");
  }

  async list(params?: Record<string, any>): Promise<ItemResponse[]> {
    throw new Error("GET method is not available for /items");
  }
}
