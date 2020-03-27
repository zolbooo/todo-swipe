import React from 'react';
import PushNotification from 'react-native-push-notification';
import { SafeAreaView, StatusBar } from 'react-native';

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

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#f3f5fa" barStyle="dark-content" />
      <SafeAreaView style={{ backgroundColor: '#f3f5fa' }}>
        <Todos />
      </SafeAreaView>
    </>
  );
};

export default App;
