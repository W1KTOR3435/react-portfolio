import { useEffect, useRef, useState } from "react";
import styles from "./About.module.scss";
import { useI18n } from "../../i18n";
import { CheckCircle } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { Coffee } from "lucide-react";
import { CircleUser } from "lucide-react";

export function useInView(threshold = 0.5) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

function AnimatedCounter({
  target = 3,
  duration = 3000,
}: {
  target: number;
  duration: number;
}) {
  const [ref, inView] = useInView(0.5);
  const [value, setValue] = useState(0);
  const [progress, setProgress] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;
    const startTime = performance.now();
    function animate(now: number) {
      const elapsed = now - startTime;
      const prog = Math.min(elapsed / duration, 1);
      setProgress(prog);
      const current = prog * target;
      setValue(current);
      if (prog < 1) requestAnimationFrame(animate);
      else {
        setValue(target);
        setProgress(1);
      }
    }
    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  const displayValue = progress < 1 ? value.toFixed(1) : Math.round(target);

  return (
    <span ref={ref}>
      <span className={styles.counter}>{displayValue}+</span>
    </span>
  );
}

function AnimatedCoffeeCounter({
  target = 10000,
  duration = 3000,
}: {
  target?: number;
  duration?: number;
}) {
  const [ref, inView] = useInView(0.5);
  const [value, setValue] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    function animate(now: number) {
      const elapsed = now - startTime;
      const prog = Math.min(elapsed / duration, 1);
      const current = Math.floor(prog * target);
      setValue(current);
      if (prog < 1) {
        requestAnimationFrame(animate);
      } else {
        setFinished(true);
      }
    }
    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className={styles.counter}>
      {finished ? "∞" : value + "+"}
    </span>
  );
}

export default function About() {
  const { t } = useI18n();

  return (
    <section className={styles.about} id="about">
      <ul className={`${styles.list} ${styles.column}`} data-aos="fade-up">
        <li className={`${styles.listItem} h3`}>
          <CheckCircle size={35} className={styles.icon} />
          {t("app.about.completed_projects")}:{" "}
          <AnimatedCounter target={10} duration={1500} />
        </li>
        <li className={`${styles.listItem} h3`}>
          <BriefcaseBusiness size={35} className={styles.icon} />
          {t("app.about.years_of_exp")}:{" "}
          <AnimatedCounter target={3} duration={1500} />
        </li>
        <li className={`${styles.listItem} h3`}>
          <Coffee size={35} className={styles.icon} />
          {t("app.about.cups_of_coffee")}:{" "}
          <AnimatedCoffeeCounter target={10000} duration={1500} />
        </li>
      </ul>
      <div
        className={`${styles.text} ${styles.column}`}
        data-aos="fade-up"
        data-aos-delay="120"
      >
        <div className="titleWrapper">
          <CircleUser size={35} /> <h2>{t("app.about.title")}</h2>
        </div>
        <p>{t("app.about.text")}</p>
      </div>
    </section>
  );
}
