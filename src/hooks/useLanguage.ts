import { useLocation, useNavigate } from "react-router-dom";

export type Language = "en" | "th";

export const useLanguage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const lang: Language = (location.pathname === "/th" || location.pathname.startsWith("/th/")) ? "th" : "en";

  const toggleLanguage = () => {
    if (lang === "en") {
      navigate(`/th${location.pathname === "/" ? "" : location.pathname}${location.search}`);
    } else {
      navigate((location.pathname.replace(/^\/th/, "") || "/") + location.search);
    }
  };

  const localPath = (path: string) => (lang === "th" ? `/th${path}` : path);

  return { lang, toggleLanguage, localPath };
};
