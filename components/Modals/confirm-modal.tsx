import useConfirmModal from "@/store/useConfirmModal";
import React, { Children } from "react";

export enum ModalEnum {
  Delete = "Delete",
  Add = "Add",
  Update = "Update",
  Close = "Close",
}
type ConfirmModalType = {
  type: ModalEnum;
  children:React.ReactNode
};
const ConfirmModal: React.FC<ConfirmModalType> = ({ type,children }) => {
  const{isModalOpen,setModalState,toggleModal}=useConfirmModal()

  return (
    <div
    className="z-[20000] bg-transparent fixed  w-full h-full bg-black items-center text-center flex justify-center">
      <div
      onClick={()=>setModalState(false)}
      className="fixed z-[20000] w-full h-full  ">

      </div>
      <div className="w-[40%] mx-4 rounded-2xl z-[20000] -translate-y-[90px] max-md:w-full h-[300px] bg-slate-400 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default ConfirmModal;