import React from 'react';
import styled from 'styled-components/native';

import TodoCard from '@/components/TodoCard';

import { useTodoCards } from './useTodoCards';

const Todos = () => {
  const {
    todos,
    screen,
    panResponder,
    transformCard,
    nextCardScale,
    nextCardOpacity,
  } = useTodoCards([
    { id: '1', title: 'Todo', color: 'green', description: 'Do something' },
    {
      id: '2',
      title: 'Todo #2',
      color: 'yellow',
      description: 'Do another something',
    },
  ]);

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

const TodosContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
`;

export default () => (
  <TodosContainer>
    <Todos />
  </TodosContainer>
);
