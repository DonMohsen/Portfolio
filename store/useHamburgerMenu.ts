import {create}from "zustand"


interface HamState{
    hamburgerMenuState:boolean
    toggleHamburgerMenuState:()=>void
}
const useHamburgerMenu=
create<HamState>((set)=>({
    hamburgerMenuState:false,
    toggleHamburgerMenuState:()=>{
        set((state)=>({hamburgerMenuState:!state.hamburgerMenuState}))
    }
}))
export default useHamburgerMenu