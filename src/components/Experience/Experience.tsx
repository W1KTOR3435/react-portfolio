import styles from "./Experience.module.scss";
import { useI18n } from "../../i18n";
import { Rocket } from "lucide-react";

export default function Experience() {
  const { t } = useI18n();
  const experienceData = t<any[]>("app.experience.listItems") || [];

  return (
    <section className={styles.experience} id="experience">
      <div className="titleWrapper titleWrapper--center" data-aos="fade-up">
        <Rocket size={35} />
        <h2 className={styles.title}>{t("app.experience.title")}</h2>
      </div>

      {experienceData.map((exp, idx) => (
        <div
          key={exp.company}
          className={idx % 2 === 0 ? styles.row : styles.rowReverse}
          data-aos="fade-up"
          data-aos-delay={idx * 100}
        >
          <div className={styles.shortInfo}>
            <h3>
              <span className="colorTertiary">{exp.role}</span>
            </h3>
            <div>
              {exp.company}
              <br />
              {exp.period}
              <br />
              <p>{exp.stack}</p>
            </div>
          </div>
          <p className={styles.details}>{exp.details}</p>
        </div>
      ))}
    </section>
  );
}
