import React, {useState, useCallback, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import Header from './Header';
import RenderScene from './renderScene/RenderScene';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const TabBarHeight = 48;
const HeaderHeight = 300;
const SafeStatusBar = Platform.select({
  ios: 44,
  android: StatusBar.currentHeight,
});
const tab1ItemSize = windowWidth / 2;
const tab2ItemSize = windowWidth / 3;
const PullToRefreshDist = 150;

const RouteTab = props => {
  const [tabIndex, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'feed', title: '피드'},
    {key: 'map', title: '지도'},
  ]);
  const [canScroll, setCanScroll] = useState(true);
  const [tab1Data] = useState(Array(40).fill(0));
  const [tab2Data] = useState(Array(30).fill(0));

  /**
   * ref
   */
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerScrollY = useRef(new Animated.Value(0)).current;
  // for capturing header scroll on Android
  const headerMoveScrollY = useRef(new Animated.Value(0)).current;
  const listRefArr = useRef([]);
  const listOffset = useRef({});
  const isListGliding = useRef(false);
  const headerScrollStart = useRef(0);
  const _tabIndex = useRef(0);
  const refreshStatusRef = useRef(false);

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
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [0, -HeaderHeight],
      extrapolateRight: 'clamp',
    });
    return (
      <Animated.View
        // {...headerPanResponder.panHandlers}
        style={[styles.header, {transform: [{translateY: y}]}]}>
        <TouchableOpacity activeOpacity={1}>
          <Header />
        </TouchableOpacity>
      </Animated.View>
    );
  };
  /////// Header part end ///////

  /////// Tab part ///////
  const renderTabBar = props => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [HeaderHeight, 0],
      extrapolateRight: 'clamp',
    });
    return (
      <Animated.View
        // {...headerPanResponder.panHandlers}
        style={[styles.tab_bar, {transform: [{translateY: y}]}]}>
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
        <RenderScene
          headerHeight={HeaderHeight}
          tabBarHeight={TabBarHeight}
          scrollY={scrollY}
          // onMomentumScrollBegin={onMomentumScrollBegin}
          // onMomentumScrollEnd={onMomentumScrollEnd}
          // onScrollEndDrag={onScrollEndDrag}
          tabRoute={route}
          tabIndex={tabIndex}
          isTabFocused={isFocused}
        />
      );
    },
    [HeaderHeight, tabIndex],
  );

  return (
    <View style={styles.container}>
      {renderTabView()}
      {renderHeader()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // header //
  header: {
    height: HeaderHeight,
    width: '100%',
    position: 'absolute',
    backgroundColor: '#FFF',
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
