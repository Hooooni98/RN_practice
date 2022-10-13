import React from 'react';
import {StatusBar} from 'react-native';

import RootNavigator from './navigation/RootNavigator';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
const App = () => {
  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
};

export default App;
