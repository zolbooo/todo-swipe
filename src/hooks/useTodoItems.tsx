import React, {
  useContext,
  useReducer,
  useCallback,
  createContext,
  ReactChild,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export type TodoItem = {
  id: string;
  title: string;
  color?: string;
  description: string;
};

export type TodoListActionType = 'DISMISS' | 'LOAD' | 'DONE' | 'ADD' | 'IGNORE';
export type TodoListAction =
  | { type: 'DISMISS' }
  | { type: 'DONE' }
  | { type: 'LOAD'; todos: TodoItem[] }
  | { type: 'ADD'; newItem: TodoItem };

function TodoListDispatcher(
  todos: TodoItem[],
  action: TodoListAction,
): TodoItem[] {
  switch (action.type) {
    case 'ADD':
      return [action.newItem, ...todos];
    case 'LOAD':
      return action.todos;
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
  dispatch: (action: TodoListAction) => void;
}>({
  todos: [],
  add: defaultFn,
  done: defaultFn,
  dismiss: defaultFn,
  dispatch: defaultFn,
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

  useEffect(() => {
    AsyncStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider value={{ todos, add, done, dismiss, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
}

export function useTodoItems() {
  return useContext(TodosContext);
}
