import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

export const DefaultHeader = () => {
  return (
    <View style={styles.header_container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  header_container: {
    height: 56,
    justifyContent: 'center',
    paddingLeft: 24,
  },
  logo: {
    height: 28,
    width: 60,
  },
});
