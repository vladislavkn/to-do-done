import { icons } from "./icons";

export type IconName = keyof typeof icons;

export type StringKeyedObject = {
  [key: string]: any;
};

export type Category = {
  name: string;
  id: string;
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

/* State */

export type State = {
  screen: string;
  navigate: (screen: string) => void;

  todos: Todo[];
  updateTodo: (todo: Todo) => void;
  removeTodo: (todo: Todo) => void;
  removeTodos: (fn: (todo: Todo) => Boolean) => void;
  addTodo: (todo: Todo) => void;

  categories: Category[];
  addCategory: (category: string) => void;
  updateCategory: (category: Category) => void;
  removeCategory: (category: Category) => void;
  selectedCategoryId: string | boolean;
  setSelectedCategoryId: (category: Category) => void;
};

/* Modal */

export type ModalInputProps = {
  value: ModalValue;
  onChange: (value: Partial<ModalValue>) => void;
} & StringKeyedObject;

export type ModalTextValue = {
  text: string;
} & StringKeyedObject;

export type ModalTimeValue = {
  minutes: string;
  hours: string;
} & StringKeyedObject;

export type ModalValue = Partial<ModalTextValue | ModalTimeValue>;

export type ModalCallback = (
  modal: Modal,
  update: ModalState["update"]
) => void;

export type ModalButtonGroup = {
  selectable: boolean;
  selected?: string;
  buttons: {
    text: string;
    iconProps?: {
      name: IconName;
      [key: string]: any;
    };
    onPress: ModalCallback;
  }[];
};

export type ModalInputType = "text" | "time" | "none";

export type Modal = {
  value: ModalValue;
  id: string;
  buttonGroups: ModalButtonGroup[];
  inputType: ModalInputType;
  autoFocus: boolean;
  submit?: ModalCallback;
  placeholder: string;
};

export type CreateModalOptions = Partial<Omit<Modal, "buttonGroups">> & {
  buttonGroups?: (ModalButtonGroup | boolean)[];
  initialValue?: ModalValue;
};

export type ModalState = {
  stack: Modal[];
  push: (createModalOptions: CreateModalOptions) => void;
  pop: () => void;
  update: (modal: Modal) => void;
};
