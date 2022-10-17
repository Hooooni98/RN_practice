import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {StackHeader} from '../headers/StackHeader';
import {ApiMangerV1} from '../../common/api/v1/ApiMangerV1';
import {globalVariable} from '../../common/globalVariable';
import {RenderLoader} from '../../common_ui/RenderLoader';
import {UI_Feed} from '../../common_ui/feed/Feed';

export const Shop = props => {
  const [feeds, setFeeds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const getFeedList = async data => {
    setIsLoading(true);
    await ApiMangerV1.get('feeds/feed/shop/', {
      params: {
        limit: globalVariable.FeedLimit,
        offset: offset,
        shop_id: data,
      },
    }).then(res => {
      console.log(res);
      setFeeds([...feeds, ...res.data.payload.feed_list.results]);
      setIsLoading(false);
      setTotalCount(res.data.payload.feed_list.total_count);
    });
    // .catch(function (error) => console.log(error));
  };
  const loadMoreItem = () => {
    if (totalCount > offset) {
      setOffset(offset + globalVariable.FeedLimit);
    }
  };
  useEffect(() => {
    getFeedList(props.route.params.shop_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);
  return (
    <SafeAreaView style={styles.container}>
      <StackHeader shop={props.route.params} />
      <FlatList
        data={feeds}
        renderItem={({item}) => <UI_Feed {...item} />}
        keyExtractor={(feeds, index) => index.toString()}
        ListFooterComponent={RenderLoader(isLoading)}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={3}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  shop_name: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
