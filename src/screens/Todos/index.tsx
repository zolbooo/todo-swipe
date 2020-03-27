import React from 'react';
import styled from 'styled-components/native';

import FoodItem from '@/components/FoodItem';

import { useAnimations } from './useAnimations';

const foods = [
  { id: '1', uri: require('@/assets/poutine.jpeg') },
  { id: '2', uri: require('@/assets/korean.jpeg') },
  { id: '3', uri: require('@/assets/IUD.jpeg') },
  { id: '4', uri: require('@/assets/ramen.jpeg') },
];

const Foods = () => {
  const {
    screen,
    currentIndex,
    panResponder,
    transformCard,
    nextCardScale,
    nextCardOpacity,
  } = useAnimations();

  return (
    <>
      {foods
        .slice(currentIndex)
        .map((food, i) =>
          i === 0 ? (
            <FoodItem
              key={food.id}
              food={food}
              width={screen.width}
              height={screen.height - 120}
              style={{ transform: transformCard }}
              {...panResponder.panHandlers}
            />
          ) : (
            <FoodItem
              key={food.id}
              food={food}
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

function Todos() {
  return (
    <TodosContainer>
      <Foods />
    </TodosContainer>
  );
}

export default Todos;
