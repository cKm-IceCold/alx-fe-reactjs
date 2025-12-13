import axios from "axios";

export async function searchUsers({ username, location, minRepos, page = 1 }) {
  let query = "";

  if (username) query += `${username} `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos}`;

  try {
    const response = await axios.get(
      `https://api.github.com/search/users?q=${encodeURIComponent(
        query
      )}&page=${page}&per_page=10`
    );

    return response.data;
  } catch (error) {
    throw new Error("Search failed");
  }
}
