import { useRef, useState, useLayoutEffect } from 'react';
import {
  Animated,
  ScaledSize,
  PanResponder,
  PanResponderGestureState,
} from 'react-native';
import { T, inc } from 'ramda';

import { useDimensions } from '@/hooks/useDimensions';

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

export function useAnimations() {
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
        const animation = getAnimation(screen, gestureState);
        const shouldShowNext = Math.abs(gestureState.dx) > 120;
        Animated.spring(position, animation).start(() => {
          if (shouldShowNext) {
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
