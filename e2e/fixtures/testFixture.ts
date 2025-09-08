import { test as base } from "@playwright/test";
import { AuthService } from "../../api/authService";
import { UserGenerator } from "../../generators/userGenerator";
import { ProjectGenerator } from "../../generators/projectGenerator";
import { UserApi } from "../../api/userApi";
import { ProjectApi } from "../../api/projectApi";

type TestFixture = {
  authService: AuthService;
  userApi: UserApi;
  projectApi: ProjectApi;
  userGenerator: UserGenerator;
  projectGenerator: ProjectGenerator;
};

export const test = base.extend<TestFixture>({
  authService: async ({}, use) => {
    const authService = new AuthService();
    await use(authService);
  },

  userApi: async ({ authService }, use) => {
    const userApi = new UserApi("http://localhost:3000", authService);
    await use(userApi);
  },

  projectApi: async ({ authService }, use) => {
    const projectApi = new ProjectApi("http://localhost:3000", authService);
    await use(projectApi);
  },

  userGenerator: async ({ page, userApi }, use) => {
    const userGenerator = new UserGenerator(userApi);
    await use(userGenerator);
    await userGenerator.cleanup();
  },

  projectGenerator: async ({ projectApi, userApi }, use) => {
    const projectGenerator = new ProjectGenerator(projectApi, userApi);
    await use(projectGenerator);
    await projectGenerator.cleanup();
  },
});
