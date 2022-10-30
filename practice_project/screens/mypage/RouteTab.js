import React, {useState, useCallback, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import Header from './Header';
import RenderScene from './renderScene/RenderScene';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import RenderLoader from '../../common_ui/RenderLoader';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const TabBarHeight = 48;
const HeaderHeight = 300;
const SafeStatusBar = Platform.select({
  ios: 44,
  android: StatusBar.currentHeight,
});

const RouteTab = props => {
  const {top} = useSafeAreaInsets();

  const [tabIndex, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'feed', title: '피드'},
    {key: 'map', title: '지도'},
  ]);

  const translateY = useSharedValue(0);

  const context = useSharedValue({y: 0});
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -HeaderHeight);
    })
    .onEnd(() => {
      if (translateY.value > 0) {
        translateY.value = withSpring(0, {damping: 50});
      }
    });
  const tabGesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -HeaderHeight);
    })
    .onEnd(() => {
      if (translateY.value > 0) {
        translateY.value = withSpring(0, {damping: 50});
      }
    });
  const transfromStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });
  const tabStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: HeaderHeight + translateY.value}],
    };
  });
  const screenStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: HeaderHeight + translateY.value}],
    };
  });

  const isListGliding = useRef(false);
  const _tabIndex = useRef(0);

  // go to scroll on top
  console.log(props.navigation);
  const flatListRef = useRef(null);
  const stackNavigation = props.navigation;
  // const tabNavigation = props.navigation.getParent();
  stackNavigation?.addListener('tabPress', e => {
    toTop();
  });
  const toTop = () => {
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  /////// Header part ///////
  const renderHeader = () => {
    return (
      <GestureDetector gesture={gesture}>
        <Animated.View
          // {...panResponder.panHandlers}
          style={[styles.header, transfromStyle]}>
          <TouchableOpacity activeOpacity={1}>
            <Header />
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
    );
  };
  /////// Header part end ///////

  /////// Tab part ///////
  const renderTabBar = props => {
    return (
      <GestureDetector gesture={tabGesture}>
        <Animated.View
          // {...panResponder.panHandlers}
          style={[styles.tab_bar, tabStyle]}>
          <TabBar
            {...props}
            onTabPress={({route, preventDefault}) => {
              if (isListGliding.current) {
                preventDefault();
              }
            }}
            style={styles.tab}
            renderLabel={renderLabel}
            indicatorStyle={styles.indicator}
          />
        </Animated.View>
      </GestureDetector>
    );
  };

  const renderLabel = ({route, focused}) => {
    return (
      <Text style={[styles.label, {opacity: focused ? 1 : 0.5}]}>
        {route.title}
      </Text>
    );
  };

  const renderTabView = () => {
    return (
      <TabView
        swipeEnabled={false} // swipe on hand
        onIndexChange={id => {
          _tabIndex.current = id;
          setIndex(id);
        }}
        navigationState={{index: tabIndex, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={{
          height: 0,
          width: windowWidth,
        }}
      />
    );
  };
  /////// Tab part end ///////

  const renderScene = useCallback(
    ({route}) => {
      const isFocused = route.key === routes[tabIndex].key;

      return (
        <Animated.View style={[styles.container, screenStyle]}>
          <RenderScene
            headerHeight={HeaderHeight}
            tabBarHeight={TabBarHeight}
            translateY={translateY.value}
            // onMomentumScrollBegin={onMomentumScrollBegin}
            // onMomentumScrollEnd={onMomentumScrollEnd}
            // onScrollEndDrag={onScrollEndDrag}
            tabRoute={route}
            tabIndex={tabIndex}
            isTabFocused={isFocused}
          />
        </Animated.View>
      );
    },
    [tabIndex],
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        {renderTabView()}
        {renderHeader()}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  status_bar: {
    backgroundColor: '#888',
  },
  // header //
  header: {
    height: HeaderHeight,
    width: '100%',
    position: 'absolute',
    backgroundColor: '#AAA',
  },
  // header //

  // tab //
  label: {fontSize: 16, color: '#000'},
  tab: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: '#FFF',
    height: TabBarHeight,
  },
  indicator: {backgroundColor: '#FF5C5C'},
  tab_bar: {
    top: 0,
    zIndex: 1,
    position: 'absolute',
    width: '100%',
  },
  // tab //
});

export default RouteTab;
