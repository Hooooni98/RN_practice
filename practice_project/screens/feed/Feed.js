import {ApiMangerV1} from '../../common/api/v1/ApiMangerV1';
import {React, useEffect, useState} from 'react';
import {View, StyleSheet, Image, FlatList, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UI_Feed} from '../../common_ui/feed/Feed';
import {globalVariable} from '../../common/globalVariable';
import {RenderLoader} from '../../common_ui/RenderLoader';

const Feed = () => {
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
    console.log(totalCount, offset);
    if (totalCount > offset) {
      setOffset(offset + globalVariable.FeedLimit);
    }
  };
  useEffect(() => {
    getFeedList();
  }, [offset]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {noFeedImage ? (
          <View>
            <Image source={{uri: noFeedImage}} style={styles.test} />
          </View>
        ) : (
          <FlatList
            data={feeds}
            renderItem={UI_Feed}
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
  test: {
    width: 250,
    height: 250,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    color: '#000',
  },
});

export default Feed;
