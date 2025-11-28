import { NavLink } from "react-router";
import { useState } from "react";
function cnActive(isActive: boolean) {
    return isActive ? "text-cyan-300" : "hover:text-sky-300";
}
export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div>
            <nav className=" bg-gray-800 py-2 font-bold flex justify-between">
                <h2 className="w-1/5 text-center text-5xl text-gray-300"><NavLink to="/">Panime</NavLink></h2>
                <ul className="w-4/5 text-3xl justify-center gap-20 md:flex hidden">
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
                    <li>
                        <NavLink to="/login" className={({ isActive }) => cnActive(isActive)}>Login</NavLink>
                    </li>
                </ul>
                <button
                    className="md:hidden text-gray-300 focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {/* Simple Hamburger Icon */}
                    <div className="space-y-1 p-2">
                        <span className="block w-10 h-1.5 bg-gray-300 rounded-full"></span>
                        <span className="block w-10 h-1.5 bg-gray-300 rounded-full"></span>
                        <span className="block w-10 h-1.5 bg-gray-300 rounded-full"></span>
                    </div>
                </button>
            </nav>
            {/* Mobile dropdown menu */}
            {menuOpen && (
                <ul className="md:hidden bg-gray-700 text-center space-y-2 py-4">
                    <li>
                        <NavLink to="/" className={({ isActive }) => cnActive(isActive)} onClick={() => setMenuOpen(false)}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/anime" className={({ isActive }) => cnActive(isActive)} onClick={() => setMenuOpen(false)}>Anime</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cartoon" className={({ isActive }) => cnActive(isActive)} onClick={() => setMenuOpen(false)}>3D Cartoon</NavLink>
                    </li>
                    <li>
                        <NavLink to="/ranking" className={({ isActive }) => cnActive(isActive)} onClick={() => setMenuOpen(false)}>Ranking</NavLink>
                    </li>
                    <li>
                        <NavLink to="/upload" className={({ isActive }) => cnActive(isActive)} onClick={() => setMenuOpen(false)}>Upload</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login" className={({ isActive }) => cnActive(isActive)} onClick={() => setMenuOpen(false)}>Login</NavLink>
                    </li>
                </ul>
            )}
        </div>

    );
}