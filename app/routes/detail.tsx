import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

export default function Detail() {
    const { id } = useParams();
    const [film, setFilm] = useState<Film | null>(null);

    useEffect(() => {
        const data = localStorage.getItem("films");
        if (!data) return;

        const list: Film[] = JSON.parse(data);
        const found = list.find((f) => f.id === Number(id));
        setFilm(found || null);
    }, [id]);

    if (!film) return <p className="text-center mt-20">Film not found!</p>;

    return (
        <div className="text-white">
            <Header />

            <div className="w-[1000px] mx-auto mt-10 bg-gray-900 p-6 rounded-2xl flex justify-center gap-20">
                <div>
                    <img
                        src={film.linkimg}
                        className="w-full h-[400px] object-contain rounded-xl"
                    />
                </div>
                <div>
                    <h1 className="text-4xl font-bold mt-4">{film.title}</h1>

                    <p className="text-sm opacity-70 mt-1">Ngày đăng: {film.dateuploaded}</p>

                    <p className="mt-5">Tóm tắt nội dung: {film.description}</p>
                    <p>Lượt truy cập: {film.countview}</p>
                    <div className="mt-6 flex gap-4">
                        <button
                            onClick={() => window.open(film.linkvideo, "_blank")}
                            className="bg-blue-500 px-5 py-2 rounded-xl hover:bg-blue-600"
                        >
                            🎬 Xem phim
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
