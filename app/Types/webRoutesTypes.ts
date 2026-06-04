import { ProjectTypes } from "@prisma/client"
import { LucideIcon } from "lucide-react"

export type webRoutesType={
    text:string,
    filledIcon:LucideIcon,
    emptyIcon:LucideIcon
    isActive?:boolean,
    route:string,
    routesChildren?:webRoutesType[],
    id:number,
    isAChild:boolean,
    filteredType?:ProjectTypes
}