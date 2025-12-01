import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

type FilmListProps = {
  films: Film[];
  setFilms?: React.Dispatch<React.SetStateAction<Film[]>>;
};

export default function FilmList({ films, setFilms }: FilmListProps) {
  const handleClick = (filmss: Film) => {
    // Tăng viewCount
    const updatedFilm = { ...filmss, countview: filmss.countview + 1 };
    if (setFilms) {
      setFilms((prev) =>
        prev.map((f) => (f.id === filmss.id ? updatedFilm : f))
      );
    }
    // Cập nhật localStorage
    const stored = localStorage.getItem("films");
    if (stored) {
      const allFilms: Film[] = JSON.parse(stored);
      const updated = allFilms.map((f) =>
        f.id === filmss.id ? updatedFilm : f
      );
      localStorage.setItem("films", JSON.stringify(updated));
    }
  };
const navigate = useNavigate();
  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-10 p-5">
      {films.length === 0 && (
        <p className="w-[1000px] text-white text-xl text-center">Không có phim nào!...</p>
      )}

      {films.map((filmsss) => (
        <div key={filmsss.id} className="text-white">
          <button
            onClick={() => {
              handleClick(filmsss);
              navigate(`/detail/${filmsss.id}`);
            }}
            className="focus:outline-none"
          >
            <img
              src={filmsss.linkimg}
              alt={filmsss.title}
              className="w-[200px] h-[250px] rounded hover:brightness-75 transition"
            />
          </button>
          <p className="text-center mt-2 font-bold">{filmsss.title}</p>
          <p className="text-center text-sm opacity-70">
            Views: {filmsss.countview}
          </p>
        </div>
      ))}
    </div>
  );
}
