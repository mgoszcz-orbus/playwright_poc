import { Api } from "./api";
import { UserCreateBody, CreatedUser } from "./models/userModel";

export class UserApi extends Api<UserCreateBody, CreatedUser> {
  async get(params?: any): Promise<CreatedUser[]> {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: "GET",
      headers: this.auth.getAuthHeaders(),
    });
    return response.json();
  }

  async post(body: UserCreateBody): Promise<CreatedUser> {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: "POST",
      headers: this.auth.getAuthHeaders(),
      body: JSON.stringify(body),
    });
    return response.json();
  }

  async delete(id: string): Promise<void> {
    await fetch(`${this.baseUrl}/users/${id}`, {
      method: "DELETE",
      headers: this.auth.getAuthHeaders(),
    });
  }
}
