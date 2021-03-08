import { StatusBar } from 'expo-status-bar';
// import React from 'react';
import { Text, View, Linking } from 'react-native';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { BottomNavigation } from 'react-native-paper';
import Profile from './src/components/Profile.js';
import Home from './src/components/Home.js';
import Search from './src/components/Search.js';
import Recommendation from './src/components/Recommendation.js';

// Profile [Activity History, Logout]
// Search icons  

// Home page: after login, show daily check in [ remain in daily check in later that day?]
// prev: link out to 3 suggestions for today 

const HomeRoute = () => <Home></Home>;
const SearchRoute = () => <Search></Search>;
const ProfileRoute = () => <Profile></Profile>;
const RecommendationRoute = () => <Recommendation></Recommendation>;


const App = () =>  {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'search', title: 'Search', icon: 'magnify' },
    { key: 'recommendation', title: 'Your Picks', icon: 'run-fast' },
    { key: 'profile', title: 'History', icon: 'chart-timeline-variant' }
    

  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    search: SearchRoute,
    profile: ProfileRoute,
    recommendation: RecommendationRoute
  });

  return (
    
      <BottomNavigation
      shifting={true}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{backgroundColor: '#48426d'}}
      />
  );
}

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}; 

AppRegistry.registerComponent(appName, () => Main);