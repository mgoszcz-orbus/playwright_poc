import { Api } from "./api";
import { CreatedProject, ProjectCreateBody } from "./models/projectModel";

export class ProjectApi extends Api<ProjectCreateBody, CreatedProject> {
  async get(params?: any): Promise<CreatedProject[]> {
    const response = await fetch(`${this.baseUrl}/projects`, {
      method: "GET",
      headers: this.auth.getAuthHeaders(),
    });
    return response.json();
  }

  async post(body: ProjectCreateBody): Promise<CreatedProject> {
    const response = await fetch(`${this.baseUrl}/projects`, {
      method: "POST",
      headers: this.auth.getAuthHeaders(),
      body: JSON.stringify(body),
    });
    return response.json();
  }

  async delete(id: string): Promise<void> {
    await fetch(`${this.baseUrl}/projects/${id}`, {
      method: "DELETE",
      headers: this.auth.getAuthHeaders(),
    });
  }
}
