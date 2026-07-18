import { webRoutesType } from "../Types/webRoutesTypes";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import {
  House,
  Briefcase,
  Layers,
  Route,
  Mail,
  Newspaper,
} from "lucide-react";

const useWebRoutes = () => {
  const pathName = usePathname();
  const locale = useLocale();
  const isFa = locale === "fa";
  const withLocale = (path: string) => `/${locale}${path}`;

  const webRoutes = useMemo<webRoutesType[]>(
    () => [
      {
        text: isFa ? "خانه" : "Home",
        route: withLocale("/"),
        emptyIcon: House,
        filledIcon: House,
        isActive: pathName === withLocale("/"),
        id: 1,
        isAChild: false,
      },
      {
        text: isFa ? "کارها" : "Work",
        route: withLocale("/work"),
        emptyIcon: Briefcase,
        filledIcon: Briefcase,
        isActive:
          pathName.includes(withLocale("/work")),
        id: 2,
        isAChild: false,
      },
      {
        text: isFa ? "خدمات" : "Services",
        route: withLocale("/services"),
        emptyIcon: Layers,
        filledIcon: Layers,
        isActive: pathName.includes(withLocale("/services")),
        id: 3,
        isAChild: false,
      },
      {
        text: isFa ? "فرآیند" : "Process",
        route: withLocale("/process"),
        emptyIcon: Route,
        filledIcon: Route,
        isActive: pathName.includes(withLocale("/process")),
        id: 4,
        isAChild: false,
      },
      {
        text: isFa ? "تماس" : "Contact",
        route: withLocale("/contact"),
        emptyIcon: Mail,
        filledIcon: Mail,
        isActive: pathName.includes(withLocale("/contact")),
        id: 5,
        isAChild: false,
      },
      {
        text: isFa ? "بلاگ" : "Blog",
        route: withLocale("/blogs"),
        emptyIcon: Newspaper,
        filledIcon: Newspaper,
        isActive: pathName.includes(withLocale("/blogs")),
        id: 6,
        isAChild: false,
      },
    ],
    [isFa, pathName, locale]
  );
  return webRoutes;
};
export default useWebRoutes;
