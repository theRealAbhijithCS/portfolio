import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OverlayMenu from "./OverlayMenu";
import { useTheme } from "./ThemeContext";
import { FiMenu, FiSun, FiMoon } from "react-icons/fi";
import Logo from "../assets/logo.png"; // Adjust path

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [forceVisible, setForceVisible] = useState(false);
  const lastScrollY = useRef(0);
  const timerId = useRef(null);

  useEffect(() => {
    const homeSection = document.querySelector("#home");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setForceVisible(true);
          setVisible(true); // Always visible on homepage
        } else {
          setForceVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (homeSection) observer.observe(homeSection);

    return () => {
      if (homeSection) observer.unobserve(homeSection);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // If on homepage, never hide navbar
      if (forceVisible) {
        setVisible(true);
        return;
      }

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        // scrolling down -> hide
        setVisible(false);
      } else {
        // scrolling up -> show
        setVisible(true);

        // hide again after 3sec idle
        if (timerId.current) clearTimeout(timerId.current);
        timerId.current = setTimeout(() => {
          setVisible(false);
        }, 3000);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, [forceVisible]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="w-12 h-12 invert dark:invert-0 transition-all duration-300" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white hidden sm:block">
            Abhijith
          </div>
        </div>

        {/* Mobile Controls (Menu + Mobile Theme Toggle) */}
        <div className="flex items-center gap-4 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="lg:hidden text-gray-900 dark:text-white focus:outline-none relative w-8 h-8 flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ y: 10, opacity: 0, rotate: 45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -10, opacity: 0, rotate: -45 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "dark" ? <FiSun size={24} /> : <FiMoon size={24} />}
              </motion.div>
            </AnimatePresence>
          </button>

          {/* Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="text-gray-900 dark:text-white text-3xl focus:outline-none"
            aria-label="Open menu"
          >
            <FiMenu />
          </button>
        </div>

        {/* Theme Toggle & Contact */}
        <div className="hidden lg:flex items-center space-x-6">
          <button
            onClick={() => {
              toggleTheme();
            }}
            className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 transition-colors focus:outline-none relative w-8 h-8 flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ y: 10, opacity: 0, rotate: 45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -10, opacity: 0, rotate: -45 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "dark" ? <FiSun size={24} /> : <FiMoon size={24} />}
              </motion.div>
            </AnimatePresence>
          </button>

          <a
            href="#contact"
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300"
          >
            Reach Out
          </a>
        </div>
      </nav>
      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
