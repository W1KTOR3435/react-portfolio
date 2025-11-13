import { useEffect, useRef } from "react";
import styles from "./MobileMenu.module.scss";
import { useI18n } from "../../i18n";

type Props = {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
};

const ANIM_MS = 350;

export function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const root = getComputedStyle(document.documentElement);
  const headerH = parseInt(root.getPropertyValue("--header-h")) || 0;
  const y = el.getBoundingClientRect().top + window.scrollY - headerH;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export default function MobileMenu({ open, onClose }: Props) {
  const { t } = useI18n();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const go = (id: string) => {
    onClose();
    window.setTimeout(() => smoothScrollTo(id), ANIM_MS);
  };

  return (
    <div
      ref={overlayRef}
      className={`${styles.overlay} ${open ? styles.open : ""}`}
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <nav className={styles.menu} role="menu">
        <ul className={styles.list}>
          <li>
            <button role="menuitem" onClick={() => go("about")}>
              {t("app.about.title")}
            </button>
          </li>
          <li>
            <button role="menuitem" onClick={() => go("experience")}>
              {t("app.experience.title")}
            </button>
          </li>
          <li>
            <button role="menuitem" onClick={() => go("skills")}>
              {t("app.skills.title")}
            </button>
          </li>
          <li>
            <button role="menuitem" onClick={() => go("certificates")}>
              {t("app.certificates.title")}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export { ANIM_MS };
