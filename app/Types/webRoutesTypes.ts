import { IconType } from "react-icons"

export type webRoutesType={
    text:string,
    filledIcon:IconType,
    emptyIcon:IconType
    isActive?:boolean,
    route?:string,
    children?:webRoutesType[]
}