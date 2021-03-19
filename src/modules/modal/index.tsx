import React from "react";
import { useModalStore } from "./store";
import Modal from "./components/Modal";
import { hasModalsSelector } from "./selectors";

const ModalWrapper = () => {
  const hasModals = useModalStore(hasModalsSelector);

  return hasModals ? <Modal /> : null;
};

export default ModalWrapper;
