import {React, useEffect, useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, StyleSheet, Image, FlatList} from 'react-native';

import {ApiMangerV1} from '../../common/api/v1/ApiMangerV1';
import {globalVariable} from '../../common/globalVariable';
import {UI_Feed} from '../../common_ui/feed/Feed';
import {RenderLoader} from '../../common_ui/RenderLoader';
import {DefaultHeader} from '../../common_ui/headers/DefaultHeader';

const Feed = props => {
  const [feeds, setFeeds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [noFeedImage, setNoFeedImage] = useState(null);

  // go to scroll on top
  const flatListRef = useRef(null);
  const stackNavigation = props.navigation;
  const tabNavigation = props.navigation.getParent();
  tabNavigation?.addListener('tabPress', e => {
    if (stackNavigation.getState().index === 0) {
      toTop();
    }
  });
  const toTop = () => {
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <DefaultHeader />
      <View style={styles.container}>
        {noFeedImage ? (
          <View>
            <Image source={{uri: noFeedImage}} style={styles.test} />
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={feeds}
            renderItem={({item}) => <UI_Feed {...item} />}
            keyExtractor={(feeds, index) => index.toString()}
            ListFooterComponent={RenderLoader(isLoading)}
            onEndReached={loadMoreItem}
            onEndReachedThreshold={3}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default Feed;
