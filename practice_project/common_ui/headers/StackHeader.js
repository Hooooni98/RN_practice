import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
export const StackHeader = props => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.header_container}>
        {props.shop ? (
          <View style={styles.shop_detail}>
            <Text style={styles.shop_name}>{props.shop.shop_name}</Text>
            <Text style={styles.shop_address}>{props.shop.shop_address}</Text>
          </View>
        ) : (
          // It is for account stack header
          <View></View>
        )}
      </View>
      {/* isolation for having absolute position back icon */}
      <View style={styles.go_back_container}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={styles.go_back_logo}
            source={require('../../assets/icons/navigation/ic_go_back.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header_container: {
    height: 56,
    fontSize: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  go_back_container: {
    height: 56,
    paddingLeft: 10,
    position: 'absolute',
    justifyContent: 'center',
  },
  go_back_logo: {
    width: 24,
    height: 24,
  },
  shop_detail: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shop_name: {
    color: '#0D0F14',
    marginBottom: 8,
  },
  shop_address: {
    color: '#4A5470',
  },
});
