import React from 'react';
import styled from 'styled-components/native';
import { prop } from 'ramda';

import { useDimensions } from '@/hooks/useDimensions';

import TodoList from './TodoList';

const bottomBarHeight = 80;
const BottomBar = styled.View`
  width: 100%;
  height: ${bottomBarHeight}px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  background-color: white;
`;

const TodosContainer = styled.View`
  width: 100%;
  height: ${prop('height')}px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
`;

const AddButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  margin-bottom: 20px;
`;
const AddIcon = styled.Image`
  width: 30px;
  height: 30px;
`;

function Todos() {
  const screen = useDimensions();
  return (
    <>
      <TodosContainer height={screen.height - bottomBarHeight}>
        <TodoList />
      </TodosContainer>
      <BottomBar
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
        }}
      >
        <AddButton>
          <AddIcon source={require('@/assets/add.png')} />
        </AddButton>
      </BottomBar>
    </>
  );
}

export default Todos;
