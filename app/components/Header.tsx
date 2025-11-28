import { NavLink } from "react-router";

function cnActive(isActive: boolean) {
    return isActive ? "text-cyan-300" : "hover:text-sky-300";
}
export default function Header() {
    return (
        <div>
            <nav className="flex bg-gray-800 py-2 font-bold">
                <h2 className="w-2/6 text-center text-5xl text-gray-300"><NavLink to="/">Panime</NavLink></h2>
                <ul className="w-4/6 text-4xl flex justify-center gap-30">
                    <li>
                        <NavLink to="/" className={({ isActive }) => cnActive(isActive)}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/anime" className={({ isActive }) => cnActive(isActive)}>Anime</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cartoon" className={({ isActive }) => cnActive(isActive)}>3D Cartoon</NavLink>
                    </li>
                    <li>
                        <NavLink to="/ranking" className={({ isActive }) => cnActive(isActive)}>Ranking</NavLink>
                    </li>
                    <li>
                        <NavLink to="/upload" className={({ isActive }) => cnActive(isActive)}>Upload</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}