type Maybe<T> = T | undefined;

type OverlayResult = {
  text: string;
  [key: string]: any;
};

export type Overlay = {
  id: string;
  placeholder: string;
  buttonsGroups: { [key: string]: (data: Maybe<OverlayResult>) => void }[];
};

export type State = {
  todos: Todo[];
  overlays: Overlay[];
  categories: string[];
  openOverlay: (overlay: Partial<Overlay>) => void;
  closeOverlay: () => void;
  updateTodo: (todo: Todo) => void;
  removeTodo: (todo: Todo) => void;
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
