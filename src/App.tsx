import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import Todos from './screens/Todos';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#f0efea" barStyle="dark-content" />
      <SafeAreaView style={{ backgroundColor: '#f0efea' }}>
        <Todos />
      </SafeAreaView>
    </>
  );
};

export default App;
