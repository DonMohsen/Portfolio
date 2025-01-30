import useConfirmModal from "@/store/useConfirmModal";
import React from "react";
import ButtonLoading from "../Loadings/button-loading";
import {
  ExclamationTriangleIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";

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

const getIcon = (type: ModalEnum) => {
  const iconClass = "w-8 h-8";
  switch (type) {
    case ModalEnum.Delete:
      return <TrashIcon className={`${iconClass} text-red-500`} />;
    case ModalEnum.Add:
      return <PlusIcon className={`${iconClass} text-green-500`} />;
    case ModalEnum.Update:
      return <ArrowsUpDownIcon className={`${iconClass} text-blue-500`} />;
    case ModalEnum.Close:
      return <XCircleIcon className={`${iconClass} text-gray-500`} />;
    default:
      return (
        <ExclamationTriangleIcon className={`${iconClass} text-yellow-500`} />
      );
  }
};

const getButtonColor = (type: ModalEnum) => {
  switch (type) {
    case ModalEnum.Delete:
      return "bg-red-600 hover:bg-red-700 focus-visible:ring-red-500";
    case ModalEnum.Add:
      return "bg-green-600 hover:bg-green-700 focus-visible:ring-green-500";
    case ModalEnum.Update:
      return "bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500";
    case ModalEnum.Close:
      return "bg-gray-600 hover:bg-gray-700 focus-visible:ring-gray-500";
    default:
      return "bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-indigo-500";
  }
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
    <div className="z-[20000] fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="fixed inset-0 z-[20000]"
        onClick={() => setModalState(false)}
      />

      <div className="relative w-full z-[20000] max-w-md bg-white rounded-xl shadow-2xl p-6 space-y-6 animate-in zoom-in-95">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-red-50 rounded-full">{getIcon(type)}</div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setModalState(false)}
            className="px-6 py-3 w-full text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className={`px-6 py-3 w-full flex items-center justify-center text-white ${getButtonColor(
              type
            )} rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed`}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <ButtonLoading />
            ) : (
              <span className="flex items-center gap-2">{submitText}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
