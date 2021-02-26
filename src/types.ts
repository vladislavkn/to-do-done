import { icons } from "./icons";

export type IconName = keyof typeof icons;

export type ArrayElement<
  ArrayType extends readonly unknown[]
> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type StringKeyedObject = {
  [key: string]: any;
};

type OverlayData = {
  setPayload: State["setOverlayPayload"];
  payload: StringKeyedObject;
};

export type OverlayCallback = (data: OverlayData) => void;

export type Overlay = {
  id: string;
  placeholder: string;
  payload: StringKeyedObject;
  submit: OverlayCallback;
  inputType: "time" | "text";
  buttonsGroups: (
    | {
        selectable: boolean;
        buttons: {
          buttonText: string;
          iconProps?: {
            name: IconName;
            [key: string]: any;
          };
          fn: OverlayCallback;
        }[];
      }
    | boolean
  )[];
  initialValue?: StringKeyedObject;
};

export type Category = {
  name: string;
  id: string;
};

export type State = {
  todos: Todo[];
  overlays: Overlay[];
  categories: Category[];
  screen: string;
  selectedCategoryId: string | boolean;
  setSelectedCategoryId: (category: Category) => void;
  navigate: (screen: string) => void;
  openOverlay: (overlay: Partial<Overlay>) => void;
  setOverlayPayload: (payload: Partial<Overlay["payload"]>) => void;
  closeOverlay: () => void;
  updateTodo: (todo: Todo) => void;
  removeTodo: (todo: Todo) => void;
  addTodo: (todo: Todo) => void;
  addCategory: (category: string) => void;
  updateCategory: (category: Category) => void;
  removeCategory: (category: Category) => void;
};

export type Todo = {
  title: string;
  done: boolean;
  id: string;
  from: number;
  duration: number;
  categoryId: string;
  time: string;
  today: boolean;
};

export type Duration = {
  hours: number;
  minutes: number;
};
