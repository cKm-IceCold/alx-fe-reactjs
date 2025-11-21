const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;

export async function getUser(username) {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  return response.json();
}
