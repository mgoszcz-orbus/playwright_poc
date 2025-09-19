import { test as base } from "@playwright/test";
import { AuthService } from "../../api/authService";
import { UserGenerator } from "../../generators/userGenerator";
import { ProjectGenerator } from "../../generators/projectGenerator";
import { UserApi } from "../../api/userApi";
import { ProjectApi } from "../../api/projectApi";
import { CreatedUser } from "../../api/models/userModel";
import { CreatedProject } from "../../api/models/projectModel";

type TestFixture = {
  authService: AuthService;
  userApi: UserApi;
  projectApi: ProjectApi;
  userGenerator: UserGenerator;
  projectGenerator: ProjectGenerator;
  user: CreatedUser;
  project: CreatedProject;
};

export const test = base.extend<TestFixture>({
  authService: async ({}, use) => {
    const authService = new AuthService();
    await use(authService);
  },

  userApi: async ({ authService }, use) => {
    const userApi = new UserApi(authService);
    await use(userApi);
  },

  projectApi: async ({ authService }, use) => {
    const projectApi = new ProjectApi(authService);
    await use(projectApi);
  },

  userGenerator: async ({ userApi }, use) => {
    const userGenerator = new UserGenerator(userApi);
    await use(userGenerator);
    await userGenerator.cleanup();
  },

  projectGenerator: async ({ projectApi, userApi }, use) => {
    const projectGenerator = new ProjectGenerator(projectApi, userApi);
    await use(projectGenerator);
    await projectGenerator.cleanup();
  },

  user: async ({ userGenerator }, use) => {
    const user = await userGenerator.generateAndPost();
    await use(user);
  },

  project: async ({ projectGenerator }, use) => {
    const project = await projectGenerator.generateAndPost();
    await use(project);
  },
});
