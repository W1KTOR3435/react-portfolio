import styles from "./Certificates.module.scss";
import { useI18n } from "../../i18n";
import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";

type Cert = {
  name: string;
  company: string;
  date: string;
  skills: string[];
  description: string;
};

export default function Certificates() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);

  const certificatesData = t<Cert[]>("app.certificates.listItems") ?? [];

  useEffect(() => {
    setActive((i) => (i < certificatesData.length ? i : 0));
  }, [certificatesData.length]);

  if (!certificatesData.length) {
    return (
      <section className={styles.certificates}>
        <div className="titleWrapper">
          <ShieldCheck size={35} />
          <h2 className={styles.title}>{t("app.certificates.title")}</h2>
        </div>
        <p>-</p>
      </section>
    );
  }

  const current = certificatesData[active];

  return (
    <section className={styles.certificates} id="certificates">
      <div className="titleWrapper" data-aos="fade-up">
        <ShieldCheck size={35} />
        <h2 className={styles.title}>{t("app.certificates.title")}</h2>
      </div>

      <div
        className={styles.mobileSelect}
        data-aos="fade-up"
        data-aos-delay="60"
      >
        <label htmlFor="cert-select" className="sr-only">
          Select:
        </label>
        <select
          id="cert-select"
          value={active}
          onChange={(e) => setActive(Number(e.target.value))}
        >
          {certificatesData.map((cert, idx) => (
            <option key={`${cert.name}-${idx}`} value={idx}>
              {cert.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.wrapper} data-aos="fade-up" data-aos-delay="120">
        <aside className={styles.sidebar}>
          <ul>
            {certificatesData.map((cert, idx) => (
              <li
                key={`${cert.name}-${idx}`}
                className={active === idx ? styles.active : ""}
                onClick={() => setActive(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setActive(idx);
                }}
                tabIndex={0}
                role="button"
                aria-pressed={active === idx}
              >
                {cert.name}
              </li>
            ))}
          </ul>
        </aside>

        <div className={styles.content}>
          <h3>
            {current.name}
            <br />
            <span className={styles.company}>@ {current.company}</span>
          </h3>
          <div className={styles.period}>{current.date}</div>
          <ul className={styles.details}>
            {(current.skills ?? []).map((desc, i) => (
              <li key={`${current.name}-skill-${i}`}>
                <span className={styles.check}>✓</span> {desc}
              </li>
            ))}
          </ul>
          <div className={styles.description}>{current.description}</div>
        </div>
      </div>
    </section>
  );
}
