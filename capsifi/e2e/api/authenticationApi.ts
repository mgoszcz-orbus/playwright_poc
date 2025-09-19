import axios, { AxiosInstance } from "axios";

export class AuthenticationApi {
  private token: string;
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "https://gateway-develop.capsifi.com",
      headers: {
        "x-tenant-id": "develop",
      },
    });
  }

  async getToken(): Promise<string> {
    if (this.token) {
      return this.token;
    }
    const response = await this.client.post("/auth/login", {
      username: "admin",
      password: "admin",
    });
    this.token = response.data.access_token;
    return this.token;
  }
}
