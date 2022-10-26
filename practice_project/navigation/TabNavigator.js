import React from 'react';
import {StyleSheet, View, Image, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Route} from './Route';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {...styles.tab_bar, ...styles.shadow},
      }}>
      {Route.map(route => (
        <Tab.Screen
          key={route.id}
          name={route.name}
          component={route.component}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <Image
                  source={focused ? route.focused : route.unfocused}
                  resizeMode="contain"
                  styles={styles.icon}
                />
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              try {
                if (route.name === 'FeedStackNavigation') {
                  if (navigation.isFocused()) {
                    navigation.navigate('FeedStackNavigation', {
                      screen: 'Feed',
                    });
                  }
                } else if (route.name === 'Mypage') {
                  if (navigation.isFocused()) {
                    navigation.navigate('Mypage');
                  }
                }
              } catch (error) {}
            },
          })}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tab_bar: {
    position: 'absolute',
    height: 90,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 0,
  },
  icon: {},
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0.15, // 낮을수록 진해짐
        },
        shadowOpacity: 0.3, // 높을수록 진해짐
        shadowRadius: 5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
});
