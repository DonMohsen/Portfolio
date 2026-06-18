import { webRoutesType } from "../Types/webRoutesTypes";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import {
  House,
  Newspaper,
  Globe,
  Linkedin,
  Mail
} from "lucide-react";

const useWebRoutes = () => {
    const pathName = usePathname();
    const locale = useLocale();
    const isFa = locale === "fa";
    const withLocale = (path: string) => `/${locale}${path}`;

 const webRoutes = useMemo<webRoutesType[]>(
    () => [
    {
        text:isFa ? "خانه" : "Home",
        route:withLocale("/"),
        emptyIcon:House,
        filledIcon:House,
        isActive:pathName===withLocale("/"),
        id:1,
        isAChild:false

    },
    {
        text:isFa ? "پروژه ها" : "Projects",
        route:withLocale("/projects"),
        emptyIcon:Newspaper,
        filledIcon:Newspaper,
        isActive:pathName.includes(withLocale("/projects")),
        id:2,
        isAChild:false,
        routesChildren:[
            {
                text:isFa ? "پروژه های کپی شده" : "Copied Projects",
                route:`${withLocale("/projects")}?type=Copy`,
                filteredType:"Copy",
                emptyIcon:Newspaper,
                filledIcon:Newspaper,
            //    isActive: `${pathName}?${searchParams.toString()}`.includes('/projects?type=Copy'),           
               id:3,
                isAChild:true
            },
            {
                text:isFa ? "پروژه های تمرینی" : "Practice Projects",
                route:`${withLocale("/projects")}?type=Practice`,
                filteredType:"Practice",
                emptyIcon:Newspaper,
                filledIcon:Newspaper,
                // isActive: `${pathName}?${searchParams.toString()}`.includes('/projects?type=Practice'),           
                id:4,
                isAChild:true
            },
            {
                text:isFa ? "پروژه های فورک شده" : "Forked Projects",
                route:`${withLocale("/projects")}?type=Forked`,
                filteredType:"Forked",
                emptyIcon:Newspaper,
                filledIcon:Newspaper,
            //    isActive: `${pathName}?${searchParams.toString()}`.includes('/projects?type=Forked'),           
               id:11,
                isAChild:true
            },  
             {
                text:isFa ? "پروژه های واقعی" : "Production Projects",
                route:`${withLocale("/projects")}?type=Real`,
                filteredType:"Real",
                emptyIcon:Newspaper,
                filledIcon:Newspaper,
            //    isActive: `${pathName}?${searchParams.toString()}`.includes('/projects?type=Real'),           
               id:12,
                isAChild:true
            },
            // {
            //     text:"کاستوم کامپوننت",
            //     route:"/projects?type=Component",
            //     emptyIcon:PiNewspaperClipping,
            //     filledIcon:PiNewspaperClippingFill,
            //     isActive:pathName==="/projects?type=Component",
            //     id:44,
            //     isAChild:true
                
            // },

        ]
    },
    {
        text:isFa ? "بلاگ" : "Blog",
        route:withLocale("/blogs"),
        emptyIcon:Globe,
        filledIcon:Globe,
        isActive:pathName.includes(withLocale('/blogs')),
        id:5,
        isAChild:false,
        routesChildren:[
            {
                text:isFa ? "بلاگ‌های شخصی" : "Personal Blogs",
                route:`${withLocale("/blogs")}?category=personal`,
                emptyIcon:Linkedin,
                filledIcon:Linkedin,
                isActive:pathName.includes("category=personal"),
                id:6,
                isAChild:true
            },
            {
                text:isFa ? "بلاگ‌های فنی" : "Tech Blogs",
                route:`${withLocale("/blogs")}?category=tech`,
                emptyIcon:Mail,
                filledIcon:Mail,
                isActive:pathName.includes("category=tech"),
                id:9,
                isAChild:true
            },
        ]
    }
],[isFa, pathName, locale])
return webRoutes
}
export default useWebRoutes;