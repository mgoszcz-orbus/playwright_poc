import { AuthService } from "./api/authService";
import { ProjectApi } from "./api/projectApi";
import { UserApi } from "./api/userApi";
import { ProjectGenerator } from "./generators/projectGenerator";

async function directUsageExample() {
  const auth = new AuthService();
  const userApi = new UserApi("https://api.example.com", auth);
  const projectApi = new ProjectApi("https://api.example.com", auth);

  const projectGenerator = new ProjectGenerator(projectApi, userApi);

  try {
    const project = await projectGenerator.generateAndPost();
    console.log(project.id);
    // Test logic
  } finally {
    await projectGenerator.cleanup();
  }
}
