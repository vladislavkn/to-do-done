import { icons } from "./icons";

export type IconName = keyof typeof icons;

export type StringKeyedObjext = {
  [key: string]: any;
};

type OverlayData = {
  closeOverlay: () => void;
  setPayload: State["setOverlayPayload"];
  text?: string;
  payload?: StringKeyedObjext;
};

export type OverlayCallback = (data: OverlayData) => void;

export type Overlay = {
  id: string;
  placeholder: string;
  payload: StringKeyedObjext;
  submit: OverlayCallback;
  buttonsGroups: {
    selectable: boolean;
    buttons: {
      buttonText: string;
      iconProps?: {
        name: IconName;
        [key: string]: any;
      };
      fn: OverlayCallback;
    }[];
  }[];
};

export type State = {
  todos: Todo[];
  overlays: Overlay[];
  categories: string[];
  openOverlay: (overlay: Partial<Overlay>) => void;
  setOverlayPayload: (payload: Partial<Overlay["payload"]>) => void;
  closeOverlay: () => void;
  updateTodo: (todo: Todo) => void;
  removeTodo: (todo: Todo) => void;
  addTodo: (todo: Partial<Todo>) => void;
};

export type Todo = {
  title: string;
  done: boolean;
  id: string;
  from?: number;
  duration?: number;
  category?: string;
  time?: string;
};
