import Map from '../screens/map/Map';
import Feed from '../screens/feed/Feed';
import Suggestion from '../screens/suggestion/Suggestion';

export const Route = [
  {
    name: 'Map',
    component: Map,
    focused: require('../assets/icons/navigation/ic_map_focused.png'),
    unfocused: require('../assets/icons/navigation/ic_map.png'),
  },
  {
    name: 'Feed',
    component: Feed,
    focused: require('../assets/icons/navigation/ic_feed_focused.png'),
    unfocused: require('../assets/icons/navigation/ic_feed.png'),
  },
  {
    name: 'Register',
    component: Suggestion,
    focused: require('../assets/icons/navigation/ic_register.png'),
    unfocused: require('../assets/icons/navigation/ic_register.png'),
  },
  {
    name: 'Suggestion',
    component: Suggestion,
    focused: require('../assets/icons/navigation/ic_suggestion_focused.png'),
    unfocused: require('../assets/icons/navigation/ic_suggestion.png'),
  },
  {
    name: 'Mypage',
    component: Suggestion,
    focused: require('../assets/icons/navigation/ic_mypage_focused.png'),
    unfocused: require('../assets/icons/navigation/ic_mypage.png'),
  },
];
