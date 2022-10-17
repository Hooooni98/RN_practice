import {View, StyleSheet, ActivityIndicator} from 'react-native';

export const RenderLoader = props => {
  return props.isLoading ? (
    <View>
      <ActivityIndicator size="large" style={styles.loader} />
    </View>
  ) : (
    <View style={styles.tab_bar_space}></View>
  );
};

const styles = StyleSheet.create({
  loader: {
    marginVertical: 16,
    alignItems: 'center',
  },
  tab_bar_space: {
    height: 70,
  },
});
