import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {DefaultHeader} from '../../common_ui/headers/DefaultHeader';

const Header = () => {
  return (
    <View style={styles.container}>
      <View>
        <DefaultHeader style={styles.test1} />
        <Text style={styles.test}>123123</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  test1: {
    flex: 1,
  },
  test: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#FFf',
  },
});
