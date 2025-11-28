import { useState } from "react";
import { Link } from "react-router";

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
  setFilms?: React.Dispatch<React.SetStateAction<Film[]>>; // optional nếu muốn update viewCount
};

export default function FilmList({ films, setFilms }: FilmListProps) {
  const handleClick = (film: Film) => {
    // Tăng viewCount
    const updatedFilm = { ...film, countview: film.countview + 1 };
    if (setFilms) {
      setFilms((prev) =>
        prev.map((f) => (f.id === film.id ? updatedFilm : f))
      );
    }
    // Cập nhật localStorage
    const stored = localStorage.getItem("films");
    if (stored) {
      const allFilms: Film[] = JSON.parse(stored);
      const updated = allFilms.map((f) =>
        f.id === film.id ? updatedFilm : f
      );
      localStorage.setItem("films", JSON.stringify(updated));
    }
  };

  return (
    <div className="grid grid-cols-4 gap-10 p-5">
      {films.length === 0 && (
        <p className="text-white col-span-4 text-center">Không có phim nào!</p>
      )}

      {films.map((film) => (
        <div key={film.id} className="text-white">
          <a
            href={film.linkvideo}
            target="_blank"
            rel="noreferrer"
            onClick={() => handleClick(film)}
          >
            <img
              src={film.linkimg}
              alt={film.title}
              className="w-[200px] h-[250px] rounded hover:brightness-75 transition"
            />
          </a>
          <p className="text-center mt-2 font-bold">{film.title}</p>
          <p className="text-center text-sm opacity-70">
            Views: {film.countview}
          </p>
        </div>
      ))}
    </div>
  );
}
