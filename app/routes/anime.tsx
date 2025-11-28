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

            <img
                src="/images/bg.jpg"
                className="w-full fixed -z-5 h-[850px] opacity-30"
            />

            <div className="flex justify-center">
                <div className="w-[1000px] h-[700px] mt-10">
                    <div className="w-[920px] text-3xl text-center py-2 bg-slate-800 ml-10">
                        <h1>Anime mới cập nhật</h1>
                    </div>

                    <FilmList films={animeFilms} />
                </div>
            </div>

            <Footer />
        </div>
    );
}
