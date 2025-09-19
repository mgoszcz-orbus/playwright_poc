import { test } from "../fixtures/testFixture";

test("test", async ({ user, project }) => {
  console.log(user.id);
  console.log(project.id);
});
