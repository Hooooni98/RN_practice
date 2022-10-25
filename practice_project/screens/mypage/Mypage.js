import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import App from './Test';

const Mypage = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFf'}}>
      <App />
    </SafeAreaView>
  );
};

export default Mypage;
