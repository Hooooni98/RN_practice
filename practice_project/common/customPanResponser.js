import React, {useRef} from 'react';
import {PanResponder, Platform} from 'react-native';

const customPanResponser = props => {
  const {scrollY, headerScrollY, headerMoveScrollY, headerScrollStart} = props;

  const handlePanReleaseOrEnd = (evt, gestureState) => {
    // console.log('handlePanReleaseOrEnd', scrollY._value);
  };
  return PanResponder.create({
    onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
    onStartShouldSetPanResponder: (evt, gestureState) => {
      console.log('onStartShouldSetPanResponder');
      // syncScrollOffset();
      return false;
    },

    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // headerScrollY.stopAnimation();
      console.log('onMoveShouldSetPanResponder');
      return Math.abs(gestureState.dy) > 5;
    },
    onPanResponderEnd: (evt, gestureState) => {
      console.log('onPanResponderEnd');
      handlePanReleaseOrEnd(evt, gestureState);
    },
    onPanResponderMove: (evt, gestureState) => {
      console.log('onPanResponderMove');
      // const curListRef = listRefArr.current.find(
      //   ref => ref.key === routes[_tabIndex.current].key,
      // );
      const headerScrollOffset = -gestureState.dy + headerScrollStart.current;
      // if (curListRef.value) {
      //   // scroll up
      //   if (headerScrollOffset > 0) {
      //     curListRef.value.scrollToOffset({
      //       offset: headerScrollOffset,
      //       animated: false,
      //     });
      //     // start pull down
      //   } else {
      //     if (Platform.OS === 'ios') {
      //       curListRef.value.scrollToOffset({
      //         offset: headerScrollOffset / 3,
      //         animated: false,
      //       });
      //     } else if (Platform.OS === 'android') {
      //       if (!refreshStatusRef.current) {
      //         headerMoveScrollY.setValue(headerScrollOffset / 1.5);
      //       }
      //     }
      //   }
      // }
    },
    onShouldBlockNativeResponder: () => true,
    onPanResponderGrant: (evt, gestureState) => {
      console.log(headerScrollStart, scrollY);
      // headerScrollStart.current = scrollY.value;
    },
  });
};

export default customPanResponser;
