import React from 'react';
import styled from 'styled-components/native';

import TodoList from './TodoList';

const TodosContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
`;

export default () => (
  <TodosContainer>
    <TodoList />
  </TodosContainer>
);
