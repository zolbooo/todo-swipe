import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useDimensions } from '@react-native-community/hooks';
import { prop, pipe, T, F } from 'ramda';

import AddTodo from '@/components/AddTodo';
import AddButton from '@/components/AddButton';

import TodoList from './TodoList';

const bottomBarHeight = 80;
const BottomBar = styled.View`
  width: 100%;
  height: ${bottomBarHeight}px;
  display: flex;
  position: relative;
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

function Todos() {
  const { screen } = useDimensions();
  const [showAddModal, setShowAddModal] = useState(false);

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
        <AddButton onPress={pipe(T, setShowAddModal)} />
      </BottomBar>
      <AddTodo show={showAddModal} close={pipe(F, setShowAddModal)} />
    </>
  );
}

export default Todos;
