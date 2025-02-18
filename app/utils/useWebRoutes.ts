import { PiNewspaperClipping, PiNewspaperClippingFill } from "react-icons/pi";
import { webRoutesType } from "../Types/webRoutesTypes";
import { IoHome, IoHomeOutline } from "react-icons/io5";
import { BsTelephone, BsTelephoneFill } from "react-icons/bs";
import { SlSocialLinkedin } from "react-icons/sl";
import { GrLinkedinOption } from "react-icons/gr";
import { MdEmail, MdOutlineMail } from "react-icons/md";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { CgWebsite } from "react-icons/cg";

const useWebRoutes = () => {
    const pathName = usePathname();

 const webRoutes = useMemo<webRoutesType[]>(
    () => [
    {
        text:"Home",
        route:"/",
        emptyIcon:IoHomeOutline,
        filledIcon:IoHome,
        isActive:pathName==="/",
        id:1

    },
    {
        text:"Projects",
        route:"/projects",
        emptyIcon:PiNewspaperClipping,
        filledIcon:PiNewspaperClippingFill,
        isActive:pathName.includes("/projects"),
        id:2,
        routesChildren:[
            {
                text:"Real Projects",
                route:"/projects#Real-Projects",
                emptyIcon:PiNewspaperClipping,
                filledIcon:PiNewspaperClippingFill,
                isActive:pathName==="/Projects#Real-Projects",
                id:3
            },
            {
                text:"Projects for Practice",
                route:"/projects#Projects-for-Practice",
                emptyIcon:PiNewspaperClipping,
                filledIcon:PiNewspaperClippingFill,
                isActive:pathName==="/Projects#Projects-for-Practice",
                id:4
            }
        ]
    },
    {
        text:"Blog",
        route:"/blog",
        emptyIcon:CgWebsite ,
        filledIcon:CgWebsite,
        isActive:pathName.includes('/blog'),
        id:5,
        routesChildren:[
            {
                text:"Social Media Apps",
                route:"/Contact/Social-Media-Apps",
                emptyIcon:SlSocialLinkedin,
                filledIcon:GrLinkedinOption,
                isActive:pathName==="/Contact/Social-Media-Apps",
                id:6,
                routesChildren:[
                  
                    {
                        text:"Email2",
        
                        route:"/Contact#Email2",
                        emptyIcon:MdOutlineMail,
                        filledIcon:MdEmail ,
                        isActive:pathName==="/Contact#Email2",
                        id:7
                    }
                ]
            },
            {
                text:"Email",

                route:"/Contact#Email",
                emptyIcon:MdOutlineMail,
                filledIcon:MdEmail ,
                isActive:pathName==="/Contact#Email",
                id:9
            },
            {
                text:"Online Chat",

                route:"/Contact#Online-Chat",
                emptyIcon:MdOutlineMail,
                filledIcon:MdEmail,
                isActive:pathName==="/Contact#Online-Chat",

                id:10
            }
        ]
    }
],[pathName])
return webRoutes
}
export default useWebRoutes;