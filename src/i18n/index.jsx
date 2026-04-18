import { createContext, useContext, useEffect, useMemo, useState } from "react";
import enUS from "./translations/en-US";
import ptBR from "./translations/pt-BR";
import esES from "./translations/es-ES";
import deDE from "./translations/de-DE";

const dictionaries = {
  "pt-BR": ptBR,
  "en-US": enUS,
  "es-ES": esES,
  "de-DE": deDE,
};

const I18nContext = createContext(null);

function getValueByPath(obj, path) {
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

function interpolate(text, params = {}) {
  return Object.entries(params).reduce((result, [key, value]) => {
    return result.replaceAll(`{${key}}`, String(value));
  }, text);
}

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(() => localStorage.getItem("locale") || "pt-BR");

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  const t = useMemo(() => {
    return (key, params) => {
      const dictionary = dictionaries[locale] || dictionaries["pt-BR"];
      const fallback = dictionaries["pt-BR"];
      const raw = getValueByPath(dictionary, key) ?? getValueByPath(fallback, key) ?? key;

      if (typeof raw !== "string") {
        return key;
      }

      return interpolate(raw, params);
    };
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }

  return context;
}
