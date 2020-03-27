import React from 'react';

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
