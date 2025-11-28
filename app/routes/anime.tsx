import Header from "../components/Header";
import Footer from "../components/Footer";
import FilmList from "../components/FilmList";
import { useEffect, useState } from "react";

type Film = {
    id: number;
    title: string;
    anime: boolean;
    cartoon: boolean;
    description: string;
    dateuploaded: string; // ISO date string
    countview: number;
    linkimg: string;
    linkvideo: string;
};

export default function Anime() {
    const [animeFilms, setAnimeFilms] = useState<Film[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("films");
        if (stored) {
            const all = JSON.parse(stored) as Film[];

            // Lọc anime
            const filtered = all.filter((f) => f.anime === true);

            // Sắp xếp theo id giảm dần (mới upload trước)
            const sorted = filtered.sort((a, b) => b.id - a.id);

            setAnimeFilms(sorted);
        }
    }, []);

    return (
        <div>
              <Header />
              <div>
                <img
                  src="/images/bg.jpg"
                  className="md:w-full fixed -z-5 md:h-[850px] w-[400px] h-[650px] opacity-30"
                />
        
                <div className="flex justify-center">
                  <div className="md:w-[1000px] h-[700px] mt-10">
                    <div className="md:w-[920px] w-[400px] text-3xl text-center py-2 bg-slate-800 md:ml-10">
                      <h1>Anime mới cập nhật</h1>
                    </div>
        
                    {/* Truyền 8 phim mới nhất vào FilmList */}
                    <FilmList films={animeFilms} />
                  </div>
                </div>
              </div>
              <Footer />
            </div>
    );
}
