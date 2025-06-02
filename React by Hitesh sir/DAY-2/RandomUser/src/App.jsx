import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("https://api.freeapi.app/api/v1/public/randomusers").then((res) =>
      res
        .json()
        .then((data) => setUser(data.data.data))
        .catch((error) => setError(error.message))
    );
  }, []);

  return (
    <div className="flex gap-5 flex-wrap justify-center pt-6">
      {user.map((user) => (
        <div
          key={user.id}
          className="max-w-sm  bg-zinc-600 text-white shadow-xl rounded-lg px-6 py-10 text-center"
        >
          <img
            src={user.picture.large}
            alt={`${user.name.first} ${user.name.last}`}
            className="w-36 h-36 rounded-full mx-auto mb-4 border-4 border-blue-500 shadow-2xl shadow-gray-500"
          />

          <h3 className="text-lg font-semibold">
            {user.name.first} {user.name.last}
          </h3>
          <p className="text-white">
            <b>Gender :</b> {user.gender}
          </p>
          <p className="text-white">
            <b>Email :</b> {user.email}
          </p>
          <p className="text-white">
            <b>Phone :</b> {user.phone}
          </p>
        </div>
      ))}
    </div>
  );
}
export default App;
