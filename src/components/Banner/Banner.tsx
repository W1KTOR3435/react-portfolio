import styles from "./Banner.module.scss";
import { useI18n } from "../../i18n";
import myPhoto from "../../assets/images/pic.webp";

export default function Banner() {
  const { t } = useI18n();

  return (
    <section className={styles.banner} id="banner">
      <div className={styles.text} data-aos="fade-up">
        <span className={styles.subtitle}>
          {t("app.banner.hello")}{" "}
          <span className={styles.name}>{t("app.banner.name")}</span>,
        </span>
        <h1>
          <span className="underline">{t("app.banner.position")}</span>{" "}
          {t("app.banner.developer")}
        </h1>
        <span className={styles.subtitle}>{t("app.banner.subtitle")}</span>
      </div>
      <div
        className={styles.imageWrapper}
        data-aos="zoom-in"
        data-aos-delay="120"
      >
        <img
          className={styles.image}
          src={myPhoto}
          width={320}
          height={320}
          loading="eager"
          alt="Wiktor Kowalczyk"
        />
      </div>
    </section>
  );
}
