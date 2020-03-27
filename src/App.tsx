import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import Todos from './screens/Todos';

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
