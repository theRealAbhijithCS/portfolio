import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // Determine initial theme based on localStorage and system preference
    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem("theme");
        if (stored) return stored;

        // Fallback to system preference
        const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        return systemPreference || "dark"; // Default to dark if all else fails
    });

    useEffect(() => {
        const root = window.document.documentElement;
        // Tailwind 4 with @custom-variant dark (&:where(.dark, .dark *));
        // We only need to toggle the 'dark' class.
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";

        if (!document.startViewTransition) {
            setTheme(newTheme);
            return;
        }

        document.startViewTransition(() => {
            setTheme(newTheme);
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
