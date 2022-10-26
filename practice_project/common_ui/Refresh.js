import React from 'react';
import {Animated, Platform, ActivityIndicator} from 'react-native';
export const renderCustomRefresh = () => {
  const AnimatedIndicator = Animated.createAnimatedComponent(ActivityIndicator);
  // headerMoveScrollY
  return Platform.select({
    ios: (
      <AnimatedIndicator
        style={{
          top: -50,
          position: 'absolute',
          alignSelf: 'center',
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [-100, 0],
                outputRange: [120, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
        animating
      />
    ),
    android: (
      <Animated.View
        style={{
          transform: [
            {
              translateY: headerMoveScrollY.interpolate({
                inputRange: [-300, 0],
                outputRange: [150, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
          backgroundColor: '#eee',
          height: 38,
          width: 38,
          borderRadius: 19,
          borderWidth: 2,
          borderColor: '#ddd',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          top: -50,
          position: 'absolute',
        }}>
        <ActivityIndicator animating />
      </Animated.View>
    ),
  });
};
