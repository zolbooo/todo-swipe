import React from 'react';
import styled from 'styled-components/native';
import PushNotification from 'react-native-push-notification';
import { StatusBar } from 'react-native';

import Todos from './screens/Todos';

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
  return (
    <>
      <StatusBar backgroundColor="#f3f5fa" barStyle="dark-content" />
      <AppContainer>
        <Todos />
      </AppContainer>
    </>
  );
};

export default App;
