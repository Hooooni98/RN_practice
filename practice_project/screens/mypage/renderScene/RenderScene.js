import React, {useState, useEffect, useRef} from 'react';
import {Dimensions, View, StyleSheet, FlatList} from 'react-native';
import Animated from 'react-native-reanimated';

import {ApiMangerV1} from '../../../common/api/v1/ApiMangerV1';
import {globalVariable} from '../../../common/globalVariable';
import {UI_Feed} from '../../../common_ui/feed/Feed';
import Suggestion from '../../suggestion/Suggestion';

const window = Dimensions.get('window');
const RenderScene = props => {
  const {headerHeight, tabBarHeight, tabRoute, tabIndex, isTabFocused} = props;
  const [feeds, setFeeds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [noFeedImage, setNoFeedImage] = useState(null);
  const getFeedList = async data => {
    setIsLoading(true);
    await ApiMangerV1.get('feeds/feed/', {
      params: {
        limit: globalVariable.FeedLimit,
        offset: offset,
        address_depth1: '',
      },
    }).then(res => {
      if (res.data.payload.feed_list) {
        setFeeds([...feeds, ...res.data.payload.feed_list.results]);
        setIsLoading(false);
        setTotalCount(res.data.payload.feed_list.total_count);
        setNoFeedImage(null);
      } else {
        setNoFeedImage(res.data.payload.image);
      }
    });
    // .catch(function (error) => console.log(error));
  };
  const loadMoreItem = () => {
    if (totalCount > offset) {
      setOffset(offset + globalVariable.FeedLimit);
    }
  };
  useEffect(() => {
    getFeedList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);
  if (tabIndex === 0) {
    return (
      <>
        <View style={styles.container}>
          <Animated.FlatList
            // ref={flatListRef}
            style={props.render_style}
            data={feeds}
            renderItem={({item}) => <UI_Feed {...item} />}
            keyExtractor={(feeds, index) => index.toString()}
            // ListFooterComponent={RenderLoader(isLoading)}
            onEndReached={loadMoreItem}
            onEndReachedThreshold={3}
            contentContainerStyle={{
              paddingTop: tabBarHeight,
              minHeight: window.height + headerHeight - tabBarHeight,
            }}
            onScroll={
              isTabFocused
                ? Animated.event(
                    [
                      {nativeEvent: {contentOffset: {y: props.translateY}}},
                      console.log(props.translateY),
                    ],

                    {useNativeDriver: true},
                  )
                : null
            }
          />
        </View>
      </>
    );
  } else {
    return <Suggestion></Suggestion>;
  }
};

export default RenderScene;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
