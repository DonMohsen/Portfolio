import { create } from "zustand";

interface ShowHeaderState{
    ShowHeaderState:boolean
    toggleShowHeaderState:()=>void
}


const useShowHeader=
create<ShowHeaderState>((set)=>({
    ShowHeaderState:false,
    toggleShowHeaderState:()=>{
        set((state)=>({ShowHeaderState:!state.ShowHeaderState}))
    }
}))
export default useShowHeader