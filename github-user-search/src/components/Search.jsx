import { useState } from "react";
import { searchUsers as fetchUserData } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const handleSearch = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const data = await fetchUserData({ username, location, minRepos, page: 1 });

      setResults(data.items);
      setTotalCount(data.total_count);
      setPage(1);
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);

    try {
      const data = await fetchUserData({
        username,
        location,
        minRepos,
        page: nextPage,
      });

      setResults((prev) => [...prev, ...data.items]);
      setPage(nextPage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        Advanced GitHub User Search
      </h1>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="bg-white p-4 rounded-xl shadow space-y-4"
      >
        <input
          type="text"
          placeholder="Username (optional)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Minimum Repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition"
        >
          Search
        </button>
      </form>

      {/* Loading */}
      {loading && <p className="text-center mt-4">Loading...</p>}

      {/* Error */}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {/* Results */}
      <div className="mt-6 space-y-4">
        {results.map((user) => (
          <div
            key={user.id}
            className="flex items-center bg-white p-4 shadow rounded-lg"
          >
            <img
              src={user.avatar_url}
              className="w-16 h-16 rounded-full"
              alt="avatar"
            />

            <div className="ml-4">
              <h3 className="font-bold">{user.login}</h3>

              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {results.length > 0 && results.length < totalCount && (
        <div className="text-center mt-4">
          <button
            onClick={loadMore}
            className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;
