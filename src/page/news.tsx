/* eslint-disable @typescript-eslint/no-unused-vars */
import { Header } from "../Components/header";
import Menu from "../Components/menu";
import { useEffect, useState } from "react";
// import NewsCard from "../Components/newsCard";
import { supabase } from "../lib/supabase";

const SHEET_ID = "1nyTgapMIa3RTLZTS4StZPURETIdeZ9sC-5qhJ2o4tv8";

type NewsItem = {
  tittle: string;
  content: string;
  created: string;
};

export type Customer = {
  id: number;
  mc_name: string;
  real_name: string;
};

export default function News() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);

  return (
    <div className="bg-gray-600 h-screen text-gray-200">
      <Header />
      <Menu />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full items-stretch">
        {
          
        }
      </div>
    </div>
  );
}
// newsData.map((news, i) => (
//           <NewsCard
//             key={i}
//             created={news.created}
//             tittle={news.tittle}
//             content={news.content}
//           />
//         ))