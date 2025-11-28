import { useState, useEffect, useRef } from "react";
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

const saveToLocal = (films: Film[]) => {
  localStorage.setItem("films", JSON.stringify(films));
};

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
  });

export default function Upload() {
  const [filmList, setFilmList] = useState<Film[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedURL, setSelectedURL] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dateUploaded, setDateUploaded] = useState<string>("");
  const [anime, setAnime] = useState<boolean>(false);
  const [cartoon, setCartoon] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  // Load films từ localStorage khi client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("films");
      if (data) setFilmList(JSON.parse(data));
    }
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDateUploaded("");
    setSelectedURL("");
    setSelectedFile(null);
    setAnime(false);
    setCartoon(false);
    setEditId(null);
  };

  const handleSummit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imgBase64 = "";
    if (selectedFile) {
      imgBase64 = await fileToBase64(selectedFile);
    }

    const newFilm: Film = {
      id: editId ?? Date.now(),
      title,
      description,
      anime,
      cartoon,
      dateuploaded: dateUploaded,
      linkimg: imgBase64,
      linkvideo: selectedURL,
      countview: 0,
    };

    let updated: Film[];
    if (editId !== null) {
      // Edit film
      updated = filmList.map((f) => (f.id === editId ? newFilm : f));
      alert("Edit thành công!");
    } else {
      // Add new film
      updated = [...filmList, newFilm];
      alert("Upload thành công!");
    }

    setFilmList(updated);
    saveToLocal(updated);
    resetForm();

    // Scroll lên đầu form
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = (id: number) => {
    const updated = filmList.filter((f) => f.id !== id);
    setFilmList(updated);
    saveToLocal(updated);
  };

  const handleEdit = (film: Film) => {
    setTitle(film.title);
    setDescription(film.description);
    setDateUploaded(film.dateuploaded);
    setSelectedURL(film.linkvideo);
    setAnime(film.anime);
    setCartoon(film.cartoon);
    setEditId(film.id);

    // Scroll lên đầu form
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Header />
      <form
        ref={formRef}
        onSubmit={handleSummit}
        className="flex flex-col gap-4 p-4 md:w-[1000px] w-[400px] h-auto mx-auto bg-white text-black my-10 rounded-2xl"
      >
        <label>
          Title's Film:
          <input
            type="text"
            placeholder="Title's Film"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Date Uploaded:
          <input
            type="date"
            placeholder="Date Uploaded"
            value={dateUploaded}
            onChange={(e) => setDateUploaded(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={anime}
            onChange={(e) => setAnime(e.target.checked)}
            className="mr-2"
          />
          Anime
        </label>
        <label>
          <input
            type="checkbox"
            checked={cartoon}
            onChange={(e) => setCartoon(e.target.checked)}
            className="mr-2"
          />
          Cartoon
        </label>
        <label>Mô tả:</label>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setSelectedFile(e.target.files[0]);
            }
          }}
        />
        <label>
          URL:{" "}
          <input
            type="text"
            placeholder="URL Video"
            value={selectedURL}
            onChange={(e) => setSelectedURL(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="bg-slate-500 p-2 rounded-2xl hover:text-sky-300 text-white w-[200px] mx-auto"
        >
          {editId !== null ? "Edit Film" : "Upload Film"}
        </button>
      </form>

      <div className="md:w-[1000px] w-[400px] mx-auto mt-10 bg-white text-black p-4 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Danh sách phim đã upload</h2>

        {filmList.length === 0 && <p>Chưa có phim nào</p>}

        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          {filmList.map((film) => (
            <div key={film.id} className="border rounded-lg p-3 shadow">
              <img
                src={film.linkimg}
                alt=""
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-xl font-bold mt-2">{film.title}</h3>
              <p className="text-sm opacity-75">{film.dateuploaded}</p>
              <p className="mt-2">{film.description}</p>
              <a
                href={film.linkvideo}
                target="_blank"
                className="text-blue-500 underline block mt-2"
              >
                Xem Video
              </a>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(film)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(film.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
