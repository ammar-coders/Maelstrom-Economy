import { Header } from "../Components/header";
import Menu from "../Components/menu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../lib/supabase";

type Customer = {
  mc_name: string;
  real_name: string;
  balance: number;
  id: number;
  password: string;
};

export default function Accounts() {
  const navigate = useNavigate();

  const isLogin = localStorage.getItem("MEisLogin");
  const userData = localStorage.getItem("MEuser");
  const account = localStorage.getItem("MEAccount");

  const myUser: Customer | null = userData
    ? JSON.parse(userData)
    : null;

  const [selectedUser, setSelectedUser] =
    useState<Customer | null>(myUser);

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isLogin || !userData || !account) {
      navigate("/register");
    }
  }, [navigate, isLogin, userData, account]);

  useEffect(() => {
    async function loadCustomers() {
      const { data, error } = await get({
        table: "customers",
      });

      if (!error && data) {
        setCustomers(data as Customer[]);
      }
    }

    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.mc_name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.real_name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="w-screen min-h-screen bg-gray-600 text-gray-200">
      <Header />
      <Menu />

      <div className="flex flex-col items-center px-40 pt-10">

        <input
          type="text"
          placeholder="Search account..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-9/10 mb-4 px-4 py-2 rounded bg-gray-800 border border-gray-700"
        />

        {search && (
          <div className="w-9/10 bg-gray-800 rounded-lg mb-4 max-h-60 overflow-y-auto">
            {filteredCustomers.map((customer) => (
              <button
                key={customer.id}
                onClick={() => setSelectedUser(customer)}
                className="w-full text-left px-4 py-3 hover:bg-gray-700 border-b border-gray-700"
              >
                <div className="font-bold">
                  {customer.real_name}
                </div>

                <div className="text-sm text-gray-300">
                  {customer.mc_name}
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="w-9/10 bg-gray-800 min-h-20 flex flex-row items-center justify-between px-5 rounded-lg py-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-300">
              about {selectedUser?.real_name}'s account:
            </span>

            <span className="font-bold text-xl">
              {selectedUser?.real_name}
            </span>

            <span className="text-sm text-gray-300">
              MC Name: {selectedUser?.mc_name}
            </span>

            <span className="text-sm text-gray-300">
              Balance: {selectedUser?.balance} ME coins
            </span>
          </div>

          <div className="text-right flex flex-col items-end">
            <div className="font-bold text-2xl mb-2">
              {selectedUser?.mc_name}
            </div>

            {selectedUser?.mc_name !== myUser?.mc_name && (
              <button
                onClick={() => setSelectedUser(myUser)}
                className="bg-yellow-500 px-4 py-2 rounded mb-2"
              >
                Previous
              </button>
            )}

            <button
              onClick={() => {
                localStorage.removeItem("MEisLogin");
                localStorage.removeItem("MEuser");
                localStorage.removeItem("MEAccount");

                navigate("/login");
              }}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}