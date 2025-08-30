import { useState, useEffect } from "react";

const Github = () => {
    const [username, setUsername] = useState("hiteshchoudhary"); // default username
    const [searchInput, setSearchInput] = useState("hiteshchoudhary");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getUserData = async (name) => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`https://api.github.com/users/${name}`);
            if (!response.ok) {
                throw new Error("User not found");
            }
            const data = await response.json();
            setUserData(data);
        } catch (err) {
            setError(err.message);
            setUserData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserData(username);
    }, [username]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim() !== "") {
            setUsername(searchInput.trim());
        }
    };

    return (
        <div className="w-full flex flex-col items-center min-h-screen bg-gray-100 p-6">
            {/* Search Box */}
            <form
                onSubmit={handleSearch}
                className="flex gap-2 mb-6 w-full max-w-md"
            >
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Enter GitHub username..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Search
                </button>
            </form>

            {/* Loading & Error */}
            {loading && <p className="text-gray-600">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* User Data */}
            {userData && (
                <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row gap-6">
                    {/* Left Side - Avatar */}
                    <div className="flex-shrink-0 flex justify-center md:justify-start">
                        <img
                            src={userData.avatar_url}
                            alt={userData.name}
                            className="w-40 h-40 rounded-xl shadow-md"
                        />
                    </div>

                    {/* Right Side - User Info */}
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold mb-2">{userData.name}</h1>
                        <p className="text-gray-600 mb-4">@{userData.login}</p>
                        <p className="text-gray-800 mb-4">{userData.bio}</p>

                        {/* Details */}
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                            <p>
                                <span className="font-semibold">Location:</span>{" "}
                                {userData.location}
                            </p>
                            <p>
                                <span className="font-semibold">Company:</span>{" "}
                                {userData.company || "N/A"}
                            </p>
                            <p>
                                <span className="font-semibold">Followers:</span>{" "}
                                {userData.followers}
                            </p>
                            <p>
                                <span className="font-semibold">Following:</span>{" "}
                                {userData.following}
                            </p>
                            <p>
                                <span className="font-semibold">Public Repos:</span>{" "}
                                {userData.public_repos}
                            </p>
                            <p>
                                <span className="font-semibold">Public Gists:</span>{" "}
                                {userData.public_gists}
                            </p>
                            <p>
                                <span className="font-semibold">Twitter:</span> @
                                {userData.twitter_username || "N/A"}
                            </p>
                            <p>
                                <span className="font-semibold">Joined:</span>{" "}
                                {new Date(userData.created_at).toDateString()}
                            </p>
                        </div>

                        {/* Links */}
                        <div className="mt-4 flex gap-4">
                            <a
                                href={userData.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                            >
                                GitHub
                            </a>
                            {userData.blog && (
                                <a
                                    href={userData.blog}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Website
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Github;
