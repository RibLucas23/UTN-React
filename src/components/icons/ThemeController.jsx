import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeController() {
   const [theme, setTheme] = useState(() => {
      const saved = localStorage.getItem("theme");
      if (saved) return saved;

      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "dark" : "light";
   });

   useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
   }, [theme]);

   const toggleTheme = () => {
      setTheme(prev => (prev === "light" ? "dark" : "light"));
   };

   return (
      <button onClick={toggleTheme} className="swap swap-rotate">

         <Sun
            className={`swap h-6 w-6 text-primary transition-opacity duration-300 ${theme === "dark" ? "opacity-0" : "opacity-100"
               }`}
         />

         <Moon
            className={`swap h-6 w-6 transition-opacity duration-300 ${theme === "dark" ? "opacity-100" : "opacity-0"
               }`}
         />
      </button>
   );
}
