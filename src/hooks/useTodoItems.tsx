import React, {
  useContext,
  useReducer,
  useCallback,
  createContext,
  ReactChild,
} from 'react';

export type TodoItem = {
  id: string;
  title: string;
  color?: string;
  description: string;
};

export type TodoListActionType = 'DISMISS' | 'DONE' | 'ADD' | 'IGNORE';
export type TodoListAction =
  | { type: 'DISMISS' }
  | { type: 'DONE' }
  | { type: 'ADD'; newItem: TodoItem };

function TodoListDispatcher(
  todos: TodoItem[],
  action: TodoListAction,
): TodoItem[] {
  switch (action.type) {
    case 'ADD':
      return [action.newItem, ...todos];
    case 'DISMISS':
      if (todos.length < 2) return todos;
      return [...todos.slice(1), todos[0]];
    case 'DONE':
      return todos.slice(1);
    default:
      throw Error(`TodoListDispatcher: unknown action ${action.type}`);
  }
}

const defaultFn = () => {
  throw Error('value for TodosContext was not provided');
};
const TodosContext = createContext<{
  todos: TodoItem[];
  add: (newItem: TodoItem) => void;
  done: () => void;
  dismiss: () => void;
}>({
  todos: [],
  add: defaultFn,
  done: defaultFn,
  dismiss: defaultFn,
});

export function TodoItemsProvider({
  children,
}: {
  children: ReactChild | ReactChild[];
}) {
  const [todos, dispatch] = useReducer(TodoListDispatcher, []);

  const dismiss = useCallback(() => dispatch({ type: 'DISMISS' }), []);
  const done = useCallback(() => dispatch({ type: 'DONE' }), []);
  const add = useCallback(
    (newItem: TodoItem) => dispatch({ type: 'ADD', newItem }),
    [],
  );

  return (
    <TodosContext.Provider value={{ todos, add, done, dismiss }}>
      {children}
    </TodosContext.Provider>
  );
}

export function useTodoItems() {
  return useContext(TodosContext);
}
