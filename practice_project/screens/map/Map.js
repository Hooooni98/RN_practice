import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {data} from '../../data';

const {width} = Dimensions.get('screen');

const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.9;

const Map = () => {
  const tabBarheight = useBottomTabBarHeight();
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}></View>

      {/* Scrollable Content */}
      <View style={styles.scrollContainer}>
        <ScrollView
          indicatorStyle="white"
          contentContainerStyle={[
            styles.scrollContentContainer,
            {paddingBottom: tabBarheight},
          ]}>
          {data.map(item => (
            <View key={item.id} style={styles.imageContainer}>
              <Text style={styles.title}>{item.description}</Text>
              <Image
                style={styles.imageCard}
                source={require('../../assets/test.png')}
                // resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    color: '#000',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 14,
  },
  imageCard: {
    borderRadius: 14,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
});
