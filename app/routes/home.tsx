import type { Route } from "./+types/home";
import Header from "../components/Header";
import FilmList from "../components/FilmList";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

type Film = {
  id: number;
  title: string;
  anime: boolean;
  cartoon: boolean;
  description: string;
  dateuploaded: string;
  countview: number;
  linkimg: string;
  linkvideo: string;
};

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Panime" },
    { name: "description", content: "Welcome to PM TuBe" },
  ];
}

export default function Home() {
  const [latestFilms, setLatestFilms] = useState<Film[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("films");
    if (stored) {
      const allFilms: Film[] = JSON.parse(stored);
      // Sắp xếp theo id giảm dần (mới nhất trước)
      const sorted = allFilms.sort((a, b) => b.id - a.id);
      // Lấy 8 phim mới nhất
      setLatestFilms(sorted.slice(0, 8));
    }
  }, []);

  return (
    <div>
      <Header />
      <div>
        <div>
          <img src="/images/bg.jpg" className="md:w-full absolute inset-0 -z-5 md:h-[750px] w-[400px] h-[650px] opacity-30 " />
        </div>
        <div className="flex justify-center">
          <div className="md:w-[1000px] h-[650px] mt-10">
            <div className="md:w-[920px] w-[400px] text-3xl text-center py-2 bg-slate-800 md:ml-10">
              <h1>Phim mới cập nhật</h1>
            </div>

            {/* Truyền 8 phim mới nhất vào FilmList */}
            <FilmList films={latestFilms} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
