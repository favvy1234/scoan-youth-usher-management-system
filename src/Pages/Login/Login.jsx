import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "synagogians" && password === "favour") {
      navigate("/dashboard");
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f172a]">
      <form
        onSubmit={handleLogin}
        className="bg-[#1e293b] w-[420px] p-10 rounded-3xl shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8">
          <img
            src="/Scoan.png"
            alt="SCOAN"
            className="w-27 h-27 object-contain mb-7"
          />

          <h1 className="text-4xl font-bold text-white">SCOAN</h1>

          <p className="text-gray-400 mt-2">
            Youth & Usher Management System
          </p>
        </div>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-4 rounded-xl bg-[#111827] text-white border border-gray-600 mb-5 outline-none"
        />

          <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 rounded-xl bg-[#111827] text-white border border-gray-600 mb-6 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl"
        >
          Login
        </button>

        <div className="text-center mt-6 text-gray-400">
          <p>Username: </p>
          <p>Password: </p>
        </div>
      </form>
    </div>
  );
}

export default Login;