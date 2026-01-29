import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useTheme } from "./ThemeContext";

export default function OverlayMenu({ isOpen, onClose }) {
  const { theme } = useTheme();
  // Pick clip origin based on screen width
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024; // lg breakpoint
  const origin = isMobile ? "95% 8%" : "50% 8%";

  // Theme-based styles
  const bgColor = theme === "dark" ? "rgba(0,0,0,0.95)" : "rgba(255,255,255,0.95)";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const hoverColor = theme === "dark" ? "hover:text-pink-400" : "hover:text-purple-600";
  const closeBtnColor = theme === "dark" ? "text-white" : "text-gray-900";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ clipPath: `circle(0% at ${origin})` }}
          animate={{ clipPath: `circle(150% at ${origin})` }}
          exit={{ clipPath: `circle(0% at ${origin})` }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ backgroundColor: bgColor }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-6 right-6 text-3xl ${closeBtnColor}`}
            aria-label="Close menu"
          >
            <FiX />
          </button>

          {/* Menu Links */}
          <ul className="space-y-6 text-center">
            {[
              "Home",
              "About",
              "Skills",
              "Projects",
              "Education",
              "Contact",
            ].map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={onClose}
                  className={`text-4xl font-semibold transition-colors duration-300 ${textColor} ${hoverColor}`}
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
