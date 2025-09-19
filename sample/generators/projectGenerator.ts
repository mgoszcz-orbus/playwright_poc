import { ProjectApi } from "../api/projectApi";
import { ProjectCreateBody, CreatedProject } from "../api/models/projectModel";
import { UserGenerator } from "./userGenerator";
import { Generator } from "./generator";
import { UserApi } from "../api/userApi";

export class ProjectGenerator extends Generator<
  ProjectCreateBody,
  CreatedProject
> {
  private userGenerator: UserGenerator;

  constructor(api: ProjectApi, userApi: UserApi) {
    super(api);
    // Create our own UserGenerator instance for complete isolation
    this.userGenerator = new UserGenerator(userApi);
  }

  async generate(): Promise<ProjectCreateBody> {
    // This will create user data but not post it to API
    const userData = await this.userGenerator.generate();

    // For this example, we need a user to exist, so we create one
    const user = await this.userGenerator.generateAndPost();

    return {
      name: `Test Project ${Date.now()}`,
      description: "A test project",
      ownerId: user.id,
    };
  }

  async cleanup(): Promise<void> {
    // Clean up projects first (child objects)
    await super.cleanup();
    // Then clean up users (parent objects) - only those created by this instance
    await this.userGenerator.cleanup();
  }
}
