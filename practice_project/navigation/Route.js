import Map from '../screens/map/Map';
import StackNavigation from '../screens/feed/StackNavigation';
import Suggestion from '../screens/suggestion/Suggestion';

export const Route = [
  {
    id: 1,
    name: 'Map',
    component: Map,
    focused: require('../assets/icons/navigation/ic_map_focused.png'),
    unfocused: require('../assets/icons/navigation/ic_map.png'),
  },
  {
    id: 2,
    name: 'StackNavigation',
    component: StackNavigation,
    focused: require('../assets/icons/navigation/ic_feed_focused.png'),
    unfocused: require('../assets/icons/navigation/ic_feed.png'),
  },
  {
    id: 3,
    name: 'Register',
    component: Suggestion,
    focused: require('../assets/icons/navigation/ic_register.png'),
    unfocused: require('../assets/icons/navigation/ic_register.png'),
  },
  {
    id: 4,
    name: 'Suggestion',
    component: Suggestion,
    focused: require('../assets/icons/navigation/ic_suggestion_focused.png'),
    unfocused: require('../assets/icons/navigation/ic_suggestion.png'),
  },
  {
    id: 5,
    name: 'Mypage',
    component: Suggestion,
    focused: require('../assets/icons/navigation/ic_mypage_focused.png'),
    unfocused: require('../assets/icons/navigation/ic_mypage.png'),
  },
];
