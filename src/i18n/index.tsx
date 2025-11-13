import { useEffect, useMemo, useState, createContext, useContext } from "react";
import pl from "./locales/pl.json";
import en from "./locales/en.json";

type Lang = "pl" | "en";
type Dict = Record<string, any>;
type Params = Record<string, string | number>;

const resources: Record<Lang, Dict> = { pl, en };

const getPath = (obj: Dict, path: string) =>
  path
    .split(".")
    .reduce((acc, k) => (acc && acc[k] != null ? acc[k] : undefined), obj);

const interpolate = (template: string, params?: Params) =>
  template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => String(params?.[k] ?? ""));

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: <T = string>(key: string, p?: Params) => T;
};
const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const initial: Lang =
    (localStorage.getItem("lang") as Lang) ||
    (navigator.language?.startsWith("pl") ? "pl" : "en");
  const [lang, setLang] = useState<Lang>(initial);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const t = useMemo(() => {
    const dict = resources[lang];
    return <T = string,>(key: string, p?: Params): T => {
      const raw = getPath(dict, key);
      if (typeof raw === "string") return interpolate(raw, p) as T;
      return raw as T;
    };
  }, [lang]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);

    const title = t<string>("app.seo.title");
    if (title) document.title = title;

    const setMeta = (name: string, content?: string) => {
      if (!content) return;
      let el = document.querySelector(
        `meta[name="${name}"]`
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    const setMetaProp = (prop: string, content?: string) => {
      if (!content) return;
      let el = document.querySelector(
        `meta[property="${prop}"]`
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", prop);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", t<string>("app.seo.description"));
    setMeta("keywords", t<string>("app.seo.keywords"));
    setMetaProp("og:title", title);
    setMetaProp("og:description", t<string>("app.seo.description"));
    setMetaProp("twitter:title", title);
    setMetaProp("twitter:description", t<string>("app.seo.description"));
  }, [lang, t]);

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useI18n = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};
