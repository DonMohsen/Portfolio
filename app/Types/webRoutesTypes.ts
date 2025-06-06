import { ProjectTypes } from "@prisma/client"
import { IconType } from "react-icons"

export type webRoutesType={
    text:string,
    filledIcon:IconType,
    emptyIcon:IconType
    isActive?:boolean,
    route:string,
    routesChildren?:webRoutesType[],
    id:number,
    isAChild:boolean,
    filteredType?:ProjectTypes
}