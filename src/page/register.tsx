import { Link, useNavigate } from "react-router-dom";
import { Header } from "../Components/header";
import Menu from "../Components/menu";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Register() {
  const navigate = useNavigate();

  const [mcName, setMcName] = useState("");
  const [realName, setRealName] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister() {
    setLoading(true);
    setError("");

    const { error } = await supabase.from("customers").insert([
      {
        mc_name: mcName,
        real_name: realName,
        password: password,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      setError(error.message);
      return;
    }

    navigate("/login");
  }

  return (
    <div className="bg-gray-600 min-h-screen w-screen text-gray-200 flex flex-col">
      <Header />
      <Menu />

      <div className="flex-1 flex items-center justify-center">
        <div className="bg-gray-800 w-80 flex flex-col p-8 rounded-xl shadow-lg">
          <span className="font-bold text-3xl pb-4 text-center">
            Register
          </span>

          <input
            type="text"
            placeholder="MC Name"
            value={mcName}
            onChange={(e) => setMcName(e.target.value)}
            className="border border-gray-600 bg-gray-700 rounded px-3 py-2 mb-3"
          />

          <input
            type="text"
            placeholder="Real Name"
            value={realName}
            onChange={(e) => setRealName(e.target.value)}
            className="border border-gray-600 bg-gray-700 rounded px-3 py-2 mb-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-600 bg-gray-700 rounded px-3 py-2 mb-4"
          />

          {error && (
            <div className="text-red-400 text-sm mb-3">
              {error}
            </div>
          )}

          <button
            onClick={handleRegister}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 transition py-2 px-4 rounded mb-4"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <Link to="/login" className="text-center text-sm">
            already have an account?{" "}
            <span className="text-blue-400 underline">
              Login here.
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}