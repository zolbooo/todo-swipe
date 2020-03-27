import React from 'react';
import styled from 'styled-components/native';

import { TodoItem } from '@/hooks/useTodoItems';
import { Animated } from 'react-native';
import { prop } from 'ramda';

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

const Card = styled.View`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.Text`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`;
const CardDescription = styled.Text`
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
        <CardTitle>{todo.title}</CardTitle>
        <CardDescription>{todo.description}</CardDescription>
      </Card>
    </CardContainer>
  );
}

export default TodoCard;
