import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import Todos from './screens/Todos';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Todos />
      </SafeAreaView>
    </>
  );
};

export default App;
