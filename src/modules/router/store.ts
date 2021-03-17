import { RouterState } from "@src/types";
import create from "zustand";
import { initialRoute } from "./routes";

const useRouterState = create<RouterState>((set) => ({
  screen: initialRoute,
  navigate: (screen) => set({ screen }),
}));

export default useRouterState;
