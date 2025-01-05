import { PiNewspaperClipping, PiNewspaperClippingFill } from "react-icons/pi";
import { webRoutesType } from "../Types/webRoutesTypes";
import { IoHome, IoHomeOutline } from "react-icons/io5";
import { BsTelephone, BsTelephoneFill } from "react-icons/bs";
import { SlSocialLinkedin } from "react-icons/sl";
import { GrLinkedinOption } from "react-icons/gr";
import { MdEmail, MdOutlineMail } from "react-icons/md";


export const webRoutes:webRoutesType[]=[
    {
        text:"Home",
        route:"/",
        emptyIcon:IoHomeOutline,
        filledIcon:IoHome,
        isActive:false,

    },
    {
        text:"Projects",
        route:"/Projects",
        emptyIcon:PiNewspaperClipping,
        filledIcon:PiNewspaperClippingFill,
        isActive:false,
        children:[
            {
                text:"Real Projects",
                route:"/Projects#Real-Projects",
                emptyIcon:PiNewspaperClipping,
                filledIcon:PiNewspaperClippingFill,
            },
            {
                text:"Projects for Practice",
                route:"/Projects#Projects-for-Practice",
                emptyIcon:PiNewspaperClipping,
                filledIcon:PiNewspaperClippingFill
            }
        ]
    },
    {
        text:"Contact",
        route:"/Contact",
        emptyIcon:BsTelephone,
        filledIcon:BsTelephoneFill,
        isActive:false,
        children:[
            {
                text:"Social Media Apps",
                route:"/Contact/#Social-Media-Apps",
                emptyIcon:SlSocialLinkedin,
                filledIcon:GrLinkedinOption
            },
            {
                text:"Email",

                route:"/Contact#Email",
                emptyIcon:MdOutlineMail,
                filledIcon:MdEmail 
            },
            {
                text:"Online Chat",

                route:"/Contact#Online-Chat",
                emptyIcon:MdOutlineMail,
                filledIcon:MdEmail
            }
        ]
    }
]