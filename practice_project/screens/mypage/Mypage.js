import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import App from './Test';
import RouteTab from './RouteTab';

const Mypage = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      {/* <App /> */}

      <RouteTab />
    </SafeAreaView>
  );
};

export default Mypage;
