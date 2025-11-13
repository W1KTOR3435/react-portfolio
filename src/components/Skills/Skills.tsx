import styles from "./Skills.module.scss";
import { useI18n } from "../../i18n";
import { Code2 } from "lucide-react";

export default function Skills() {
  const { t } = useI18n();

  const skillsData = [
    {
      title: "Frontend",
      items: [
        "React / Vue",
        "JavaScript",
        "TypeScript",
        "Vite",
        "SCSS / TailwindCSS",
      ],
    },
    {
      title: "Backend",
      items: ["C#", ".NET", "REST APIs", "PHP", "PostgreSQL"],
    },
    {
      title: t("app.skills.soft"),
      items: [
        t("app.skills.adaptability"),
        t("app.skills.effective_communication"),
        t("app.skills.problem_solving"),
        t("app.skills.collaboration"),
        t("app.skills.commitment"),
      ],
    },
    {
      title: t("app.skills.other"),
      items: [
        "Git & GitHub",
        "Azure DevOps",
        t("app.skills.figma"),
        "Agile / Scrum",
        "VS Code",
      ],
    },
  ];

  return (
    <section className={styles.skills} id="skills">
      <div className="titleWrapper" data-aos="fade-up">
        <Code2 size={35} />
        <h2 className={styles.title}>{t("app.skills.title")}</h2>
      </div>

      <div className={styles.grid} data-aos="fade-up" data-aos-delay="100">
        {skillsData.map((group) => (
          <details className={styles.group} key={group.title} open>
            <summary className={styles.groupTitle}>{group.title}</summary>
            <ul className={styles.list}>
              {group.items.map((item) => (
                <li key={item} className={styles.item}>
                  {item}
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </section>
  );
}
