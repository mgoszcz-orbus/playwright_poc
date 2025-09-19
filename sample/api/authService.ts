export class AuthService {
  private token: string;

  async getToken(): Promise<string> {
    if (!this.token) {
      this.token = await fetch("https://api.example.com/auth").then((res) =>
        res.json()
      );
    }
    return this.token;
  }

  getAuthHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };
  }

  async refreshToken(): Promise<void> {
    // Token refresh logic if needed
    // this.token = await fetchNewToken();
  }
}
