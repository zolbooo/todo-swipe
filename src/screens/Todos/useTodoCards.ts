import { useRef, useState, useLayoutEffect } from 'react';
import {
  Animated,
  ScaledSize,
  PanResponder,
  PanResponderGestureState,
} from 'react-native';
import { T, inc, pipe, cond, gt, always, lt, prop, __ } from 'ramda';

import { useDimensions } from '@/hooks/useDimensions';

type TodoAction = 'DISMISS' | 'DONE' | 'IGNORE';

const getAction: (dx: number) => TodoAction = cond([
  [gt(__, 120), always('DONE')],
  [lt(__, -120), always('DISMISS')],
  [T, always('IGNORE')],
]);

function getAnimation(action: TodoAction, dy: number, screenWidth: number) {
  switch (action) {
    case 'DONE':
      return { toValue: { x: screenWidth + 100, y: dy } };
    case 'DISMISS':
      return { toValue: { x: -screenWidth - 100, y: dy } };
    default:
      return {
        toValue: { x: 0, y: 0 },
        friction: 4,
      };
  }
}

export function useTodoCards() {
  const screen = useDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);

  const position = useRef(new Animated.ValueXY()).current;
  useLayoutEffect(() => position.setValue({ x: 0, y: 0 }), [currentIndex]);

  const panResponder = useRef(
    PanResponder.create({
      onPanResponderMove: Animated.event([
        null,
        { dx: position.x, dy: position.y },
      ]),
      onMoveShouldSetPanResponder: T,
      onPanResponderRelease: (_, gestureState: PanResponderGestureState) => {
        const action = getAction(gestureState.dx);
        const animation = getAnimation(action, gestureState.dy, screen.width);
        Animated.spring(position, animation).start(() => {
          if (action !== 'IGNORE') {
            setCurrentIndex(inc);
          }
        });
      },
    }),
  ).current;

  const rotate = useRef(
    position.x.interpolate({
      inputRange: [-screen.width / 2, 0, screen.width / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp',
    }),
  ).current;
  const transformCard = [{ rotate }, ...position.getTranslateTransform()];

  const nextCardOpacity = useRef(
    position.x.interpolate({
      inputRange: [-screen.width / 2, 0, screen.width / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp',
    }),
  ).current;
  const nextCardScale = useRef(
    position.x.interpolate({
      inputRange: [-screen.width / 2, 0, screen.width / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp',
    }),
  ).current;

  return {
    screen,
    currentIndex,
    panResponder,
    transformCard,
    nextCardOpacity,
    nextCardScale,
  };
}
