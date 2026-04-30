import { Header } from "../Components/header";
import Menu from "../Components/menu";
import banner from "../../public/Banner.jpeg";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export type Customer = {
  id: number;
  mc_name: string;
  real_name: string;
};

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = localStorage.getItem("MEisLogin");

    if (!isLogin) {
      navigate("/register");
    }
  }, [navigate]);

  return (
    <main className="w-screen h-screen bg-gray-600 text-gray-200">
      <Header />
      <Menu />

      <div className="flex flex-col items-center justify-center px-40">
        <span
          className="text-6xl font-black text-transparent bg-clip-text bg-cover bg-center inline-block"
          style={{ backgroundImage: `url('${banner}')` }}
        >
          Maelstrom Economy
        </span>

        <br />

        <span className="block w-full text-left">
          One part of maelstrom community, "Maelstrom Economy".
        </span>
      </div>
    </main>
  );
}