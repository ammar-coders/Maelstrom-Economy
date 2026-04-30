import { Link, useNavigate } from "react-router-dom";
import { Header } from "../Components/header";
import Menu from "../Components/menu";
import { useState } from "react";
import { get } from "../lib/supabase";

type Customer = {
  mc_name: string;
  real_name: string;
  balance: number;
  id: number;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setError("");

    const { data, error } = await get({
      table: "customers",
    });

    setLoading(false);

    if (error || !data) {
      setError("Failed to load users");
      return;
    }

    const user = (data as Customer[]).find(
      (customer) =>
        (
          customer.mc_name === username ||
          customer.real_name === username
        ) &&
        customer.password === password
    );

    if (!user) {
      setError("Invalid Username or Password");
      return;
    }

    localStorage.setItem("MEisLogin", "true");
    localStorage.setItem("MEuser", JSON.stringify(user));
    localStorage.setItem("MEAccount", user.mc_name);

    navigate("/accounts");
  }

  return (
    <div className="bg-gray-600 min-h-screen w-screen text-gray-200 flex flex-col">
      <Header />
      <Menu />

      <div className="flex-1 flex items-center justify-center">
        <div className="bg-gray-800 w-70 flex flex-col items-center justify-center p-8 rounded-xl">
          <span className="font-bold text-3xl pb-2">
            Login
          </span>

          <input
            type="text"
            placeholder="MC Name or Real Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border block mb-2 px-2 py-1 text-black"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border block mb-4 px-2 py-1 text-black"
          />

          {error && (
            <span className="text-red-400 text-sm mb-2">
              {error}
            </span>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <Link to="/register" className="text-center mt-3">
            don't have an account?{" "}
            <span className="text-blue-400 underline">
              Register here.
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}