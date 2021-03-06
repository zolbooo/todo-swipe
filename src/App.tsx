import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import PushNotification from 'react-native-push-notification';
import * as LocalAuthentication from 'expo-local-authentication';

import { StatusBar } from 'react-native';

import Todos from './screens/Todos';
import { TodoItemsProvider } from './hooks/useTodoItems';

PushNotification.configure({
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

const AppContainer = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background-color: #f3f5fa;
`;

const App = () => {
  const [locked, setLocked] = useState(true);
  useEffect(() => {
    LocalAuthentication.authenticateAsync({
      promptMessage: 'Unlock todo-swipe app',
    }).then(({ success }) => {
      if (success) {
        setLocked(false);
      }
    });
  }, []);

  if (locked) return null;
  return (
    <>
      <StatusBar backgroundColor="#f3f5fa" barStyle="dark-content" />
      <TodoItemsProvider>
        <AppContainer>
          <Todos />
        </AppContainer>
      </TodoItemsProvider>
    </>
  );
};

export default App;
