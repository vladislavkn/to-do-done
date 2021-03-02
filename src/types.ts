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

export type OverlayButtonGroup = {
  selectable: boolean;
  buttons: {
    buttonText: string;
    iconProps?: {
      name: IconName;
      [key: string]: any;
    };
    fn: OverlayCallback;
  }[];
};

export type Overlay = {
  id: string;
  autofocus: boolean;
  placeholder: string;
  payload: StringKeyedObject;
  inputType: "time" | "text" | "none";
  buttonGroups: OverlayButtonGroup[];
  initialValue: StringKeyedObject;
  submit?: OverlayCallback;
};

export type CreateOverlayOptions = Pick<Overlay, "inputType" | "submit"> &
  Partial<Pick<Overlay, "placeholder" | "initialValue" | "autofocus">> & {
    buttonGroups?: (ArrayElement<Overlay["buttonGroups"]> | boolean)[];
  };

export type OverlayInputProps = {
  value: StringKeyedObject;
  onChange: (value: React.SetStateAction<OverlayInputProps["value"]>) => void;
  [key: string]: any;
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
  openOverlay: (overlay: CreateOverlayOptions) => void;
  setOverlayPayload: (payload: Partial<Overlay["payload"]>) => void;
  closeOverlay: () => void;
  updateTodo: (todo: Todo) => void;
  removeTodo: (todo: Todo) => void;
  removeTodos: (fn: (todo: Todo) => Boolean) => void;
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
