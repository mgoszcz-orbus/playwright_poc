import { test } from "../fixtures/testFixture";

test("test", async ({ userGenerator, projectGenerator }) => {
  const user = await userGenerator.generateAndPost();
  console.log(user.id);
  const project = await projectGenerator.generateAndPost();
  console.log(project.id);
});
