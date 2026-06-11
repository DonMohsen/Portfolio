import {create}from "zustand"


interface HamState {
  hamburgerMenuState: boolean;
  toggleHamburgerMenuState: () => void;
  closeHamburgerMenuState: () => void;
}

const useHamburgerMenu = create<HamState>((set) => ({
  hamburgerMenuState: false,
  toggleHamburgerMenuState: () => {
    set((state) => ({ hamburgerMenuState: !state.hamburgerMenuState }));
  },
  closeHamburgerMenuState: () => {
    set({ hamburgerMenuState: false });
  },
}));
export default useHamburgerMenu