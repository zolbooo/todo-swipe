import { useReducer, useCallback } from 'react';

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

export function useTodoItems(initialState: TodoItem[]) {
  const [todos, dispatch] = useReducer(TodoListDispatcher, initialState);

  const dismiss = useCallback(() => dispatch({ type: 'DISMISS' }), []);
  const done = useCallback(() => dispatch({ type: 'DONE' }), []);
  const add = useCallback(
    (newItem: TodoItem) => dispatch({ type: 'ADD', newItem }),
    [],
  );

  return { todos, add, done, dismiss };
}
