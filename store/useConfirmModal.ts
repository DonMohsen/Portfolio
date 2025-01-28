import { create } from "zustand";

// Define the store state interface
interface ModalStore {
  isModalOpen: boolean;
  toggleModal: () => void;
  setModalState: (state: boolean) => void;
}

// Create the Zustand store
const useConfirmModal = create<ModalStore>((set) => ({
    isModalOpen: false,
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  setModalState: (state) => set({ isModalOpen: state }),
}));

export default useConfirmModal;
