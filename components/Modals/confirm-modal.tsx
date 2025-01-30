import useConfirmModal from "@/store/useConfirmModal";
import React from "react";
import ButtonLoading from "../Loadings/button-loading";

export enum ModalEnum {
  Delete = "Delete",
  Add = "Add",
  Update = "Update",
  Close = "Close",
}

type ConfirmModalType = {
  type: ModalEnum;
  title: string;
  description: string;
  onSubmit: () => void;
  isLoading?: boolean;
  submitText?: string;
  cancelText?: string;
};

const ConfirmModal: React.FC<ConfirmModalType> = ({
  type,
  title,
  description,
  onSubmit,
  isLoading = false,
  submitText = "Confirm",
  cancelText = "Cancel",
}) => {
  const { setModalState } = useConfirmModal();
  return (
    <div className="z-[20000] fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        onClick={() => setModalState(false)}
        className="fixed inset-0 z-[20000]"
      ></div>
      
      <div className="w-[40%] mx-4 rounded-2xl z-[20000] max-md:w-full h-[300px] bg-white flex flex-col p-6">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-2xl font-extrabold tracking-tighter">{title}</h2>
        </div>

        {/* Description */}
        <div className="flex-1 mb-6">
          <p className="text-gray-700">{description}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className={`px-4 py-2 h-12 w-full text-white flex items-center justify-center rounded transition-colors ${
              isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
            aria-busy={isLoading}
          >
            {isLoading ? <ButtonLoading /> : submitText}
          </button>
          
          <button
            onClick={() => setModalState(false)}
            className="px-4 py-2 h-12 w-full bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;