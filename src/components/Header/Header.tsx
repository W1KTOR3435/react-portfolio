import { useI18n } from "../../i18n";
import styles from "./Header.module.scss";
import ThemeToggle from "../ThemeToggle";
import LangToggle from "../LangToggle";
import MobileMenu from "../MobileMenu/MobileMenu";
import { useState } from "react";

export function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const root = getComputedStyle(document.documentElement);
  const headerH = parseInt(root.getPropertyValue("--header-h")) || 0;
  const y = el.getBoundingClientRect().top + window.scrollY - headerH;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export default function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const ANIM_MS = 350;
  const go = (id: string) => {
    window.setTimeout(() => smoothScrollTo(id), ANIM_MS);
  };

  return (
    <header className={styles.header}>
      <a className={styles.logo} onClick={() => go("banner")}>
        {t("app.title")}
      </a>
      <div className={styles.toggles}>
        <ThemeToggle />
        <LangToggle />
      </div>
      <button
        id="burger-btn"
        className={styles.burger}
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        onNavigate={() => {}}
      />
    </header>
  );
}
