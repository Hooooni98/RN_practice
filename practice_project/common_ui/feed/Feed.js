import React from 'react';
import {View, Text, Image, Dimensions, StyleSheet, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width} = Dimensions.get('screen');
const PROFILE_IMAGE_WIDTH = width * 0.1;
const PROFILE_IMAGE_HEIGHT = PROFILE_IMAGE_WIDTH;
const IMAGE_WIDTH = width;
const IMAGE_HEIGHT = IMAGE_WIDTH;

export const UI_Feed = item => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* 프사, 닉네임 */}
      <View style={styles.header_container}>
        <Image
          source={{uri: item.profile_image}}
          style={styles.profile_image}
        />
        <Text style={styles.nickname}>{item.nickname}</Text>
      </View>
      {/* 이미지 */}
      <View style={styles.image_container}>
        <Image source={{uri: item.image[0]}} style={styles.image} />
      </View>
      {/* 유용한 기능 포크, 댓글 등등 */}
      <View style={styles.useful_content}></View>
      {/* 정보 */}
      <View style={styles.content}>
        <View style={styles.content_detail}>
          <View style={styles.fooiyti_container}>
            <Text style={styles.fooiyti}>{item.fooiyti}</Text>
            <Image
              source={{uri: item.taste_evaluation_image}}
              style={styles.taste_evaluation_image}
            />
          </View>
          <View style={styles.shop_container}>
            <TouchableOpacity
              style={styles.shop}
              onPress={() => {
                navigation.navigate('Shop', {
                  shop_id: item.shop_id,
                  shop_name: item.shop_name,
                  shop_address: item.shop_address,
                });
              }}>
              <Text>{item.shop_name}</Text>
            </TouchableOpacity>

            <View style={styles.menu_container}>
              <Text>{item.menu_name}</Text>
              <Text style={styles.menu_price}>{item.menu_price}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.comment}>{item.comment}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    width: width,
  },
  profile_image: {
    borderRadius: 100,
    marginLeft: 16,
    width: PROFILE_IMAGE_WIDTH,
    height: PROFILE_IMAGE_HEIGHT,
  },
  header_container: {
    flexDirection: 'row',
  },
  nickname: {
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 10,
    height: PROFILE_IMAGE_HEIGHT,
  },

  image_container: {
    marginTop: PROFILE_IMAGE_WIDTH / 2,
    marginBottom: PROFILE_IMAGE_WIDTH / 2,
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },
  content_detail: {
    flexDirection: 'row',
  },
  fooiyti_container: {
    width: width / 6,
    height: width / 6,
    marginLeft: 16,
    borderColor: '#FF5C5C',
    borderStyle: 'solid',
    borderWidth: 1.3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fooiyti: {
    color: '#FF5C5C',
    fontSize: 18,
  },
  taste_evaluation_image: {
    width: 24,
    height: 24,
    fontStyle: 'normal',
    marginTop: 4,
  },
  shop_container: {
    marginLeft: 20,
    height: width / 6,
    justifyContent: 'center',
  },
  shop: {
    color: '#000',
    fontSize: 18,
  },
  menu_container: {
    marginTop: 10,
    flexDirection: 'row',
  },
  menu_price: {
    marginLeft: 8,
    color: '#FF5C5C',
  },

  comment: {
    marginLeft: 20,
    marginTop: 16,
    color: '#4A5470',
    lineHeight: 24,
    fontSize: 14,
  },
});
