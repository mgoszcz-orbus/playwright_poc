import { UserCreateBody, CreatedUser } from "../api/models/userModel";
import { UserApi } from "../api/userApi";
import { Generator } from "./generator";

export class UserGenerator extends Generator<UserCreateBody, CreatedUser> {
  constructor(api: UserApi) {
    super(api);
  }

  async generate(): Promise<UserCreateBody> {
    return {
      name: `Test User ${Date.now()}`,
      email: `testuser${Date.now()}@example.com`,
    };
  }
}
