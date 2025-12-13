import { getUser } from "../services/githubService";

async function handleSearch() {
  const data = await getUser("octocat");
  console.log(data);
}
