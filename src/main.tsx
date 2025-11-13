import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/main.scss";
import { I18nProvider } from "./i18n/index.tsx";

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
const theme =
  savedTheme === "dark" || savedTheme === "light"
    ? savedTheme
    : prefersDark
    ? "dark"
    : "light";
document.documentElement.setAttribute("data-theme", theme);

if (!savedTheme) {
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const onChange = (e: MediaQueryListEvent) => {
    document.documentElement.setAttribute(
      "data-theme",
      e.matches ? "dark" : "light"
    );
  };
  mql.addEventListener?.("change", onChange);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>
);
