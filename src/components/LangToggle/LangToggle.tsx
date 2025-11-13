import { useI18n } from "../../i18n";
import styles from "./LangToggle.module.scss";

export default function LangToggle() {
  const { lang, setLang } = useI18n();

  const nextLang = lang === "pl" ? "en" : "pl";

  return (
    <button
      className={styles.toggle}
      onClick={() => setLang(nextLang)}
      aria-label="Toggle language"
    >
      {lang.toUpperCase()} <span className={styles.arrow}>{" -> "}</span>{" "}
      {nextLang.toUpperCase()}
    </button>
  );
}
