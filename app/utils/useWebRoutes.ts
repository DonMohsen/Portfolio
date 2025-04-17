import { PiNewspaperClipping, PiNewspaperClippingFill } from "react-icons/pi";
import { webRoutesType } from "../Types/webRoutesTypes";
import { IoHome, IoHomeOutline } from "react-icons/io5";
import { BsTelephone, BsTelephoneFill } from "react-icons/bs";
import { SlSocialLinkedin } from "react-icons/sl";
import { GrLinkedinOption } from "react-icons/gr";
import { MdEmail, MdOutlineMail } from "react-icons/md";
import { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { CgWebsite } from "react-icons/cg";

const useWebRoutes = () => {
    const pathName = usePathname();
    const searchParams = useSearchParams();

 const webRoutes = useMemo<webRoutesType[]>(
    () => [
    {
        text:"خانه",
        route:"/",
        emptyIcon:IoHomeOutline,
        filledIcon:IoHome,
        isActive:pathName==="/",
        id:1,
        isAChild:false

    },
    {
        text:"پروژه ها",
        route:"/projects",
        emptyIcon:PiNewspaperClipping,
        filledIcon:PiNewspaperClippingFill,
        isActive:pathName.includes("/projects"),
        id:2,
        
        isAChild:false,
        routesChildren:[
            {
                text:"پروژه های کپی شده",
                route:"/projects?type=Copy",
                emptyIcon:PiNewspaperClipping,
                filledIcon:PiNewspaperClippingFill,
               isActive: `${pathName}?${searchParams.toString()}`.includes('/projects?type=Copy'),           
               id:3,
                isAChild:true
            },
            {
                text:"پروژه های تمرینی",
                route:"/projects?type=Practice",
                emptyIcon:PiNewspaperClipping,
                filledIcon:PiNewspaperClippingFill,
                isActive: `${pathName}?${searchParams.toString()}`.includes('/projects?type=Practice'),           
                id:4,
                isAChild:true
            },
            {
                text:"پروژه های فورک شده",
                route:"/projects?type=Forked",
                emptyIcon:PiNewspaperClipping,
                filledIcon:PiNewspaperClippingFill,
               isActive: `${pathName}?${searchParams.toString()}`.includes('/projects?type=Forked'),           
               id:11,
                isAChild:true
            },  
             {
                text:"پروژه های واقعی",
                route:"/projects?type=Real",
                emptyIcon:PiNewspaperClipping,
                filledIcon:PiNewspaperClippingFill,
               isActive: `${pathName}?${searchParams.toString()}`.includes('/projects?type=Real'),           
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
        text:"بلاگ",
        route:"/blogs",
        emptyIcon:CgWebsite ,
        filledIcon:CgWebsite,
        isActive:pathName.includes('/blogs'),
        id:5,
        isAChild:false,
        routesChildren:[
            {
                text:"بلاگ های شخصی",
                route:"/blogs",
                emptyIcon:SlSocialLinkedin,
                filledIcon:GrLinkedinOption,
                isActive:pathName==="/blogs?type=Personal",
                id:6,
                isAChild:true
               
            },
            {
                text:"بلاگ های تکنولوژی",

                route:"/blogs?type=Tech",
                emptyIcon:MdOutlineMail,
                filledIcon:MdEmail ,
                isActive:pathName==="/blogs?type=Tech",
                id:9,
                isAChild:true
            },
            {
                text:"بلاگ های متفرقه",

                route:"/blogs?type=Others",
                emptyIcon:MdOutlineMail,
                filledIcon:MdEmail,
                isActive:pathName==="/blogs?type=Others",

                id:10,
                isAChild:true
            }
        ]
    }
],[pathName,searchParams])
return webRoutes
}
export default useWebRoutes;