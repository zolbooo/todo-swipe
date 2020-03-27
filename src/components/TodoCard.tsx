import React from 'react';
import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { prop, propOr, pipe, __ } from 'ramda';

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
  style: any;
};

const pickColorFromPalette = pipe(propOr('white', 'color'), prop(__, palette));

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

const CardTitle = styled.Text<{ color?: string }>`
  color: ${propOr('black', 'color')};
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`;
const CardDescription = styled.Text<{ color?: string }>`
  color: ${propOr('black', 'color')};
  font-size: 16px;
  font-weight: 500;
`;

function TodoCard({
  width,
  height,
  todo,
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
        <CardTitle color={todo.color && 'white'}>{todo.title}</CardTitle>
        <CardDescription color={todo.color && 'white'}>
          {todo.description}
        </CardDescription>
      </Card>
    </CardContainer>
  );
}

export default TodoCard;
