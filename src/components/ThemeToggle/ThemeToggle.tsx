import { useEffect, useState } from "react";
import s from "./ThemeToggle.module.scss";

type Theme = "dark" | "light";

const getTheme = (): Theme =>
  (document.documentElement.getAttribute("data-theme") as Theme) || "dark";

const apply = (t: Theme) => {
  document.documentElement.setAttribute("data-theme", t);
  localStorage.setItem("theme", t);
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getTheme());

  useEffect(() => {
    if (localStorage.getItem("theme")) return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) =>
      setTheme(e.matches ? "dark" : "light");
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    apply(next);
    setTheme(next);
  };

  return (
    <button className={s.toggle} onClick={toggle} aria-label="Toggle theme">
      <span className={s.icon} aria-hidden>
        {theme === "dark" ? "☀️" : "🌙"}
      </span>
      <span className={s.text}>{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
