import create from "zustand";
import {
  ModalState,
  Modal,
  ModalTimeValue,
  ModalTextValue,
  ModalInputType,
  ModalButtonGroup,
} from "../../types";
import { generateId } from "../../utils";

const getTextInitialValue = (): ModalTextValue => ({
  text: "",
});

const getTimeInitialValue = (): ModalTimeValue => ({
  minutes: "",
  hours: "",
});

const getModalInitialValue = (type: ModalInputType) => {
  return {
    text: getTextInitialValue,
    time: getTimeInitialValue,
    none: () => ({}),
  }[type]();
};

export const useModalStore = create<ModalState>((set) => ({
  stack: [],
  push: (createModalOptions) =>
    set((state) => {
      const inputType = createModalOptions?.inputType ?? "none";
      const modal: Modal = {
        inputType,
        autoFocus: createModalOptions.autoFocus ?? false,
        value:
          createModalOptions?.initialValue ?? getModalInitialValue(inputType),
        id: generateId(),
        buttonGroups:
          (createModalOptions?.buttonGroups?.filter(
            Boolean
          ) as ModalButtonGroup[]) ?? [],
        placeholder: createModalOptions.placeholder ?? "",
        submit: createModalOptions.submit,
      };

      return { stack: [...state.stack, modal] };
    }),
  pop: () => set((state) => ({ stack: state.stack.slice(0, -1) })),
  update: (modal) =>
    set((state) => ({
      stack: state.stack.map((m) => (m.id === modal.id ? modal : m)),
    })),
}));
