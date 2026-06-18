import { create } from "zustand";

interface BlogFormStore {
  isOpen: boolean;
  toggleForm: () => void;
  setFormState: (state: boolean) => void;
}

const useBlogForm = create<BlogFormStore>((set) => ({
  isOpen: false,
  toggleForm: () => set((state) => ({ isOpen: !state.isOpen })),
  setFormState: (state) => set({ isOpen: state }),
}));

export default useBlogForm;
