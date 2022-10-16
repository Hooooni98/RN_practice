import {ApiMangerV1} from '../../common/api/v1/ApiMangerV1';
import {React, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UI_Feed} from '../../common_ui/feed/Feed';

// export const result = async data => {
//   console.log(result);
//   return result;
// };

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const getFeedList = async data => {
    await ApiMangerV1.get('feeds/feed/').then(res =>
      setFeeds(res.data.payload.feed_list.results),
    );
    // .catch(function (error) => console.log(error));
  };
  useEffect(() => {
    getFeedList();
  }, []);

  console.log(feeds[0]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {feeds.map((feed, index) => (
            // eslint-disable-next-line react/self-closing-comp
            <UI_Feed
              key={index}
              profile_image={feed.profile_image}
              nickname={feed.nickname}
              image={feed.image[0]}
              fooiyti={feed.fooiyti}
              taste_evaluation={feed.taste_evaluation_image}
              shop_name={feed.shop_name}
              menu_name={feed.menu_name}
              menu_price={feed.menu_price}
              comment={feed.comment}
              count_liked={feed.count_liked}></UI_Feed>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
