import { useRef, useLayoutEffect } from 'react';
import { T, cond, gt, always, lt, __ } from 'ramda';
import { Animated, PanResponder, PanResponderGestureState } from 'react-native';

import { useDimensions } from '@/hooks/useDimensions';
import { useTodoItems, TodoItem } from '@/hooks/useTodoItems';

type TodoAction = 'DISMISS' | 'DONE' | 'IGNORE';

const getAction = cond<number, TodoAction>([
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

export function useTodoCards(initialState: TodoItem[]) {
  const screen = useDimensions();
  const { todos, dismiss, done } = useTodoItems(initialState);

  const position = useRef(new Animated.ValueXY()).current;
  useLayoutEffect(() => position.setValue({ x: 0, y: 0 }), [todos]);

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
          if (action === 'DONE') done();
          if (action === 'DISMISS') dismiss();
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
    todos,
    screen,
    panResponder,
    transformCard,
    nextCardOpacity,
    nextCardScale,
  };
}
