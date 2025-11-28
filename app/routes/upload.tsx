import { useState } from "react";
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
type AddFilmFormProps = {
    onAddFilm: (film: Film) => void;
};
const saveToLocal = (films: Film[]) => {
    localStorage.setItem("films", JSON.stringify(films));
};

const loadFromLocal = (): Film[] => {
    const data = localStorage.getItem("films");
    return data ? JSON.parse(data) : [];
};
const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
    });
export default function Upload({ onAddFilm }: AddFilmFormProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedURL, setSelectedURL] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [dateUploaded, setDateUploaded] = useState<string>("");
    const [countView, setCountView] = useState<number>(0);
    const [anime, setAnime] = useState<boolean>(false);
    const [cartoon, setCartoon] = useState<boolean>(false);
    const [filmList, setFilmList] = useState<Film[]>(loadFromLocal());
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleEdit = (id: number, updatedFilm: Film) => {
        const updated = filmList.map((f) => (f.id === id ? updatedFilm : f));
        setFilmList(updated);
        localStorage.setItem("films", JSON.stringify(updated));
    }
    const handleSummit = async (e: React.FormEvent) => {
        e.preventDefault();
        let imgBase64 = "";
        if (selectedFile) {
            imgBase64 = await fileToBase64(selectedFile);
        }
        if (editingId) {
            // Edit mode
            const updatedFilm: Film = {
                id: editingId,
                title,
                description,
                anime,
                cartoon,
                dateuploaded: dateUploaded,
                linkimg: imgBase64 || filmList.find(f => f.id === editingId)?.linkimg || "",
                linkvideo: selectedURL,
                countview: filmList.find(f => f.id === editingId)?.countview || 0,
            };
            handleEdit(editingId, updatedFilm);
            alert("Cập nhật thành công!");
            setEditingId(null); // reset
        } else {
            // Upload mới
            const newFilm: Film = {
                id: Date.now(),
                title,
                description,
                anime,
                cartoon,
                dateuploaded: dateUploaded,
                linkimg: imgBase64,
                linkvideo: selectedURL,
                countview: 0,
            };
            const updated = [...filmList, newFilm];
            setFilmList(updated);
            saveToLocal(updated);
            alert("Upload thành công!");
        }

        // Reset input
        setTitle("");
        setDescription("");
        setDateUploaded("");
        setSelectedURL("");
        setSelectedFile(null);
        setAnime(false);
        setCartoon(false);
        setCountView(0);
    };
    const handleDelete = (id: number) => {
        const updated = filmList.filter((f) => f.id !== id);
        setFilmList(updated);
        localStorage.setItem("films", JSON.stringify(updated));
    };
    return (
        <div>
            <Header />
            <form onSubmit={handleSummit} className="flex flex-col gap-4 p-4 w-[1000px] h-[600px] mx-auto bg-white text-black my-10 rounded-2xl">

                <label>Title's Film: <input type="text"
                    placeholder="Title's Film"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                </label>
                <label>Date Uploaded: <input type="date"
                    placeholder="Date Uploaded"
                    value={dateUploaded}
                    onChange={(e) => setDateUploaded(e.target.value)}
                />
                </label>
                <label >
                    <input type="checkbox"
                        checked={anime}
                        onChange={(e) => setAnime(e.target.checked)}
                        className="mr-2"
                    />
                    Anime
                </label>
                <label>
                    <input type="checkbox"
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
                />
                <input type="file"
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            setSelectedFile(e.target.files[0]);
                        }
                    }}
                />
                <label>URL: <input type="text"
                    placeholder="URL Video"
                    value={selectedURL}
                    onChange={(e) => setSelectedURL(e.target.value)}
                />
                </label>
                <button type="submit" className="bg-slate-500 p-2 rounded-2xl hover:text-sky-300 text-white w-[200px] mx-auto">Upload Film</button>
            </form>
            <div className="w-[1000px] mx-auto mt-10 bg-white text-black p-4 rounded-xl">
                <h2 className="text-2xl font-bold mb-4">Danh sách phim đã upload</h2>

                {filmList.length === 0 && <p>Chưa có phim nào</p>}

                <div className="grid grid-cols-3 gap-4">
                    {filmList.map(film => (
                        <div key={film.id} className="border rounded-lg p-3 shadow">
                            <img src={film.linkimg} alt="" className="w-full h-40 object-cover rounded" />
                            <h3 className="text-xl font-bold mt-2">{film.title}</h3>
                            <p className="text-sm opacity-75">{film.dateuploaded}</p>
                            <p className="mt-2">{film.description}</p>
                            <a href={film.linkvideo} target="_blank" className="text-blue-500 underline block mt-2">
                                Xem Video
                            </a>
                            <button
                                onClick={() => handleDelete(film.id)}
                                className=" bg-red-500 text-blue px-2 py-1 rounded hover:bg-red-600"
                            >
                                Xóa
                            </button>
                            <button
                                onClick={() => {
                                    setEditingId(film.id);
                                    setTitle(film.title);
                                    setDescription(film.description);
                                    setDateUploaded(film.dateuploaded);
                                    setSelectedURL(film.linkvideo);
                                    setAnime(film.anime);
                                    setCartoon(film.cartoon);
                                    setSelectedFile(null);
                                }}
                                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 m-2 "
                            >
                                Edit
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>

    );
}