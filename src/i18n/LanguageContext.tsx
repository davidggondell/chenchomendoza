import React, { createContext, useContext, useState, useEffect } from "react";
import type { Language } from "../types";
import { es, type MessageKey } from "./messages/es";
import { gl } from "./messages/gl";
import { en } from "./messages/en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: MessageKey) => string;
}

const dictionaries: Record<Language, Record<MessageKey, string>> = {
  es,
  gl,
  en,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const detectDefaultLanguage = (): Language => {
  if (typeof window === "undefined") return "es";

  const saved = localStorage.getItem("app_language") as Language;
  if (saved && (saved === "es" || saved === "gl" || saved === "en")) {
    return saved;
  }

  const browserLang = (navigator.language || "").toLowerCase();
  if (browserLang.startsWith("gl")) return "gl";
  if (browserLang.startsWith("es")) return "es";
  if (browserLang.startsWith("en")) return "en";

  return "es";
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(detectDefaultLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("app_language", lang);
      document.documentElement.lang = lang;
    } catch {
      // Ignore storage errors in private browsing
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: MessageKey): string => {
    const dict = dictionaries[language] || dictionaries.es;
    return dict[key] || dictionaries.es[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
