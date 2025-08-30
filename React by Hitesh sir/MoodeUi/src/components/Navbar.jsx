import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const navLinkClasses = ({ isActive }) =>
        isActive
            ? "text-yellow-300 font-semibold underline"
            : "hover:underline cursor-pointer";

    return (
        <header className="w-full py-4 bg-neutral-800 text-white fixed top-0 z-50">
            <nav className="max-w-7xl mx-auto flex justify-between items-center px-4">
                {/* Logo */}
                <Link to={"/"} className="text-xl font-bold tracking-wide">
                    VibeStream
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6">
                    <NavLink to="/" className={navLinkClasses}>
                        Home
                    </NavLink>
                    <NavLink to="/Explore" className={navLinkClasses}>
                        Explore
                    </NavLink>
                    <NavLink to="/Library" className={navLinkClasses}>
                        Your Library
                    </NavLink>
                </ul>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden focus:outline-none"
                    aria-label="Toggle navigation"
                    onClick={() => setMobileNavOpen(!mobileNavOpen)}
                >
                    <svg
                        width="28"
                        height="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="4" y1="7" x2="24" y2="7" />
                        <line x1="4" y1="14" x2="24" y2="14" />
                        <line x1="4" y1="21" x2="24" y2="21" />
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu */}
            {mobileNavOpen && (
                <ul className="md:hidden bg-neutral-700 flex flex-col space-y-2 py-3 text-center animate-slideDown">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `py-2 block ${isActive ? "bg-neutral-600 text-yellow-300 font-semibold" : "hover:bg-neutral-600"
                            }`
                        }
                        onClick={() => setMobileNavOpen(false)}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/Explore"
                        className={({ isActive }) =>
                            `py-2 block ${isActive ? "bg-neutral-600 text-yellow-300 font-semibold" : "hover:bg-neutral-600"
                            }`
                        }
                        onClick={() => setMobileNavOpen(false)}
                    >
                        Explore
                    </NavLink>
                    <NavLink
                        to="/Library"
                        className={({ isActive }) =>
                            `py-2 block ${isActive ? "bg-neutral-600 text-yellow-300 font-semibold" : "hover:bg-neutral-600"
                            }`
                        }
                        onClick={() => setMobileNavOpen(false)}
                    >
                        Your Library
                    </NavLink>
                </ul>
            )}
        </header>
    );
}
