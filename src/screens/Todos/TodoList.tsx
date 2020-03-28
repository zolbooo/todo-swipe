import React from 'react';

import AllDone from '@/components/AllDone';
import TodoCard from '@/components/TodoCard';

import { useTodoCards } from './useTodoCards';
import { useNotifications } from './useNotifications';

const TodoList = () => {
  const {
    todos,
    screen,
    panResponder,
    transformCard,
    nextCardScale,
    nextCardOpacity,
  } = useTodoCards();
  useNotifications(todos);

  if (todos.length === 0) return <AllDone />;
  return (
    <>
      {todos
        .map((todo, i) =>
          i === 0 ? (
            <TodoCard
              key={todo.id}
              todo={todo}
              width={screen.width}
              height={screen.height - 120}
              style={{ transform: transformCard }}
              {...panResponder.panHandlers}
            />
          ) : (
            <TodoCard
              key={todo.id}
              todo={todo}
              width={screen.width}
              height={screen.height - 120}
              style={{
                opacity: nextCardOpacity,
                transform: [{ scale: nextCardScale }],
              }}
            />
          ),
        )
        .reverse()}
    </>
  );
};

export default TodoList;
