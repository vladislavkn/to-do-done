import React from "react";
import { useModalStore } from "../store/modal";
import { hasModalsSelector } from "../store/selectors";
import Modal from "./Modal";

const ModalWrapper = () => {
  const hasModals = useModalStore(hasModalsSelector);

  return hasModals ? <Modal /> : null;
};

export default ModalWrapper;
