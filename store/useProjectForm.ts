import { create } from "zustand";

// Define the store state interface
interface FormStore {
  isOpen: boolean;
  toggleForm: () => void;
  setFormState: (state: boolean) => void;
}

// Create the Zustand store
const useProjectForm = create<FormStore>((set) => ({
  isOpen: false,
  toggleForm: () => set((state) => ({ isOpen: !state.isOpen })),
  setFormState: (state) => set({ isOpen: state }),
}));

export default useProjectForm;
