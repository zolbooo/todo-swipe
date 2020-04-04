import React from 'react';
import styled from 'styled-components/native';
import { Animated, View } from 'react-native';
import { prop, propOr, pipe, __, ifElse, equals, always } from 'ramda';

import palette from '@/assets/palette.json';
import { TodoItem } from '@/hooks/useTodoItems';

const CardContainer = styled(Animated.View)`
  width: ${prop('width')}px;
  height: ${prop('height')}px;
  padding: 10px;
  position: absolute;
`;

type TodoCardProps = {
  todo: TodoItem;
  width: number;
  height: number;
  remainingTodos: number;
  style: any;

  skip: () => void;
  done: () => void;
};

const pickColorFromPalette = pipe(
  propOr('white', 'color'),
  prop(__, palette) as (color: string) => string,
);

const Card = styled.View<{ color?: string }>`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 20px;
  background-color: ${pickColorFromPalette};
  display: flex;
  flex-direction: column;
`;

const getTextColor = pipe(
  prop('color') as (arg: { color: string }) => string,
  ifElse(equals('white'), always('black'), always('white')),
);
const CardTitle = styled.Text<{ color?: string }>`
  color: ${getTextColor};
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`;
const CardDescription = styled.Text<{ color?: string }>`
  color: ${getTextColor};
  font-size: 16px;
  font-weight: 500;
`;

const CardActionSection = styled.View`
  width: 100%;
  height: 40px;
  padding: 0 15px;
  margin-top: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ActionButton = styled.TouchableWithoutFeedback`
  width: 30px;
  height: 30px;
`;
const ActionIcon = styled.Image`
  width: 30px;
  height: 30px;
`;

function TodoCard({
  remainingTodos,
  width,
  height,
  todo,
  skip,
  done,
  ...props
}: TodoCardProps & { [key: string]: any }) {
  return (
    <CardContainer width={width} height={height} {...props}>
      <Card
        color={todo.color}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
        }}
      >
        <CardTitle color={todo.color || 'white'}>{todo.title}</CardTitle>
        <CardDescription color={todo.color || 'white'}>
          {todo.description}
        </CardDescription>
        <CardActionSection>
          {remainingTodos > 1 ? (
            <ActionButton onPress={skip}>
              <ActionIcon
                source={
                  todo.color === 'white'
                    ? require('@/assets/icons/skip_black.png')
                    : require('@/assets/icons/skip.png')
                }
              />
            </ActionButton>
          ) : (
            <View />
          )}
          <ActionButton onPress={done}>
            <ActionIcon
              source={
                todo.color === 'white'
                  ? require('@/assets/icons/done_black.png')
                  : require('@/assets/icons/done.png')
              }
            />
          </ActionButton>
        </CardActionSection>
      </Card>
    </CardContainer>
  );
}

export default TodoCard;
