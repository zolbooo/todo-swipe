import React, { useRef, useState, useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import { prop, T, inc } from 'ramda';
import {
  Animated,
  PanResponder,
  PanResponderGestureState,
  ScaledSize,
} from 'react-native';

import { useDimensions } from '@/hooks/useDimensions';

const foods = [
  { id: '1', uri: require('@/assets/poutine.jpeg') },
  { id: '2', uri: require('@/assets/korean.jpeg') },
  { id: '3', uri: require('@/assets/IUD.jpeg') },
  { id: '4', uri: require('@/assets/ramen.jpeg') },
];
type Food = { id: string; uri: any };

const FoodContainer = styled(Animated.View)`
  width: ${prop('width')}px;
  height: ${prop('height')}px;
  padding: 10px;
  position: absolute;
`;
const FoodPicture = styled.Image`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

const getAnimation = (
  screen: ScaledSize,
  gestureState: PanResponderGestureState,
) => {
  if (gestureState.dx > 120) {
    return { toValue: { x: screen.width + 100, y: gestureState.dy } };
  }
  if (gestureState.dx < -120) {
    return { toValue: { x: -screen.width - 100, y: gestureState.dy } };
  }
  return {
    toValue: { x: 0, y: 0 },
    friction: 4,
  };
};

const FoodItem = ({
  food,
  width,
  height,
  style,
  ...props
}: {
  food: Food;
  width: number;
  height: number;
  style?: any;
}) => {
  return (
    <FoodContainer
      key={food.id}
      width={width}
      height={height}
      style={style}
      {...props}
    >
      <FoodPicture source={food.uri} />
    </FoodContainer>
  );
};

const Foods = () => {
  const screen = useDimensions();

  const [currentIndex, setCurrentIndex] = useState(0);

  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onPanResponderMove: Animated.event([
        null,
        { dx: position.x, dy: position.y },
      ]),
      onMoveShouldSetPanResponder: T,
      onPanResponderRelease: (_, gestureState: PanResponderGestureState) => {
        const animation = getAnimation(screen, gestureState);
        const shouldShowNext = Math.abs(gestureState.dx) > 120;
        Animated.spring(position, animation).start(() => {
          if (shouldShowNext) {
            setCurrentIndex(inc);
            position.setValue({ x: 0, y: 0 });
          }
        });
      },
    }),
  ).current;

  const rotate = position.x.interpolate({
    inputRange: [-screen.width / 2, 0, screen.width / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });
  const transformCard = [{ rotate }, ...position.getTranslateTransform()];

  const nextCardOpacity = position.x.interpolate({
    inputRange: [-screen.width / 2, 0, screen.width / 2],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp',
  });
  const nextCardScale = position.x.interpolate({
    inputRange: [-screen.width / 2, 0, screen.width / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: 'clamp',
  });

  return foods
    .slice(currentIndex)
    .map((food, i) => {
      const props = {
        food,
        key: food.id,
        width: screen.width,
        height: screen.height - 120,
      };
      if (i === 0)
        return (
          <FoodItem
            {...props}
            {...panResponder.panHandlers}
            style={{ transform: transformCard }}
          />
        );
      return (
        <FoodItem
          {...props}
          style={{
            opacity: nextCardOpacity,
            transform: [{ scale: nextCardScale }],
          }}
        />
      );
    })
    .reverse();
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
