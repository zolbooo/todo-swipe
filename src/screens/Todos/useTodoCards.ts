import { useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { useDimensions } from '@react-native-community/hooks';

import { T } from 'ramda';
import AsyncStorage from '@react-native-community/async-storage';
import { Animated, PanResponder, PanResponderGestureState } from 'react-native';

import { useCallbackRef } from '@/hooks/useCallbackRef';
import { useTodoItems, TodoItem } from '@/hooks/useTodoItems';

type TodoAction = 'DISMISS' | 'DONE' | 'IGNORE';

function getAction(dx: number, remainingTodos: number): TodoAction {
  if (dx > 120) return 'DONE';
  if (dx < -120) {
    return remainingTodos > 1 ? 'DISMISS' : 'IGNORE';
  }
  return 'IGNORE';
}

export function useTodoCards() {
  const { screen } = useDimensions();
  const { todos, dispatch, dismiss, done: nextCard } = useTodoItems();
  useEffect(() => {
    AsyncStorage.getItem('todos')
      .then((data: string | null) => data && JSON.parse(data))
      .then(
        (loadedTodos: TodoItem[] | false) =>
          loadedTodos && dispatch({ type: 'LOAD', todos: loadedTodos }),
      )
      .catch(console.error);
  }, []);

  const position = useRef(new Animated.ValueXY()).current;
  useLayoutEffect(() => position.setValue({ x: 0, y: 0 }), [todos]);

  const done = useCallback(
    (gestureState?: PanResponderGestureState) => {
      Animated.spring(position, {
        toValue: { x: screen.width + 100, y: gestureState?.dy ?? 0 },
      }).start(nextCard);
    },
    [position, screen],
  );
  const skip = useCallback(
    (gestureState?: PanResponderGestureState) => {
      Animated.spring(position, {
        toValue: { x: -screen.width - 100, y: gestureState?.dy ?? 0 },
      }).start(dismiss);
    },
    [position, screen],
  );

  const handleGestureReleaseRef = useCallbackRef(
    (gestureState: PanResponderGestureState) => {
      const action = getAction(gestureState.dx, todos.length);
      switch (action) {
        case 'DISMISS':
          skip(gestureState);
          break;
        case 'DONE':
          done(gestureState);
          break;
        default:
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            friction: 4,
          }).start();
      }
    },
    [todos.length],
  );

  const panResponder = useRef(
    PanResponder.create({
      onPanResponderMove: Animated.event([
        null,
        { dx: position.x, dy: position.y },
      ]),
      onMoveShouldSetPanResponder: T,
      onPanResponderRelease: (_, gestureState: PanResponderGestureState) =>
        handleGestureReleaseRef.current(gestureState),
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
    done,
    skip,
    todos,
    screen,
    panResponder,
    transformCard,
    nextCardOpacity,
    nextCardScale,
  };
}
