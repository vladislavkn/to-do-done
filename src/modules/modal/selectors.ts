import { ModalState } from "@src/types";

export const hasModalsSelector = (state: ModalState) => state.stack.length > 0;
export const topModalSelector = (state: ModalState) =>
  state.stack[state.stack.length - 1];
