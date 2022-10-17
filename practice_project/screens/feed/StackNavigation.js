import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Feed from './Feed';
import {Shop} from '../../common_ui/shop/Shop';

const Stack = createStackNavigator();
const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Feed"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="Shop" component={Shop} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
