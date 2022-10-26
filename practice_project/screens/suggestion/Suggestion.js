import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
const Suggestion = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Suggestion</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: '#000',
  },
});

export default Suggestion;
