import axios, { AxiosInstance } from "axios";
import { AuthenticationApi } from "./authenticationApi";

export abstract class Api<TBody, TResponse> {
  protected client: AxiosInstance;

  constructor(
    baseURL: string,
    protected basePath: string,
    authenticationApi: AuthenticationApi
  ) {
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authenticationApi.getToken()}`,
      },
    });
  }

  protected abstract buildItemUrl(id: string): string;

  async get(id: string): Promise<TResponse> {
    const response = await this.client.get<TResponse>(`${this.basePath}/${id}`);
    return response.data;
  }

  async list(params?: Record<string, any>): Promise<TResponse[]> {
    const response = await this.client.get<TResponse[]>(this.basePath, {
      params,
    });
    return response.data;
  }

  async create(data: Partial<TBody>): Promise<TResponse> {
    const response = await this.client.post<TResponse>(this.basePath, data);
    return response.data;
  }

  async update(id: string, data: Partial<TBody>): Promise<TResponse> {
    const response = await this.client.put<TResponse>(
      `${this.basePath}/itemId=${id}`,
      data
    );
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await this.client.delete(`${this.basePath}/itemId=${id}`);
  }
}
