import React from 'react';

import AllDone from '@/components/AllDone';
import TodoCard from '@/components/TodoCard';

import { useTodoCards } from './useTodoCards';
import { useNotifications } from './useNotifications';

const TodoList = () => {
  const {
    done,
    skip,
    todos,
    screen,
    panResponder,
    transformCard,
    nextCardScale,
    nextCardOpacity,
  } = useTodoCards();
  useNotifications(todos);

  if (todos.length === 0) return <AllDone />;

  const cardProps = {
    done,
    skip,
    width: screen.width,
    height: screen.height - 120,
  };
  return (
    <>
      {todos
        .map((todo, i) =>
          i === 0 ? (
            <TodoCard
              {...cardProps}
              key={todo.id}
              todo={todo}
              style={{ transform: transformCard }}
              {...panResponder.panHandlers}
            />
          ) : (
            <TodoCard
              {...cardProps}
              key={todo.id}
              todo={todo}
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
