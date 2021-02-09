import { StatusBar } from 'expo-status-bar';
// import React from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { BottomNavigation } from 'react-native-paper';
import Profile from './';

// test


// Profile [Activity History, Logout]
// Search icons  

// Home page: after daily check in, link out to 3 suggestions for today 

 const HomeRoute = () => <Text>Home</Text>;



// const HomeRoute = () => {
//   <View style={styles.container}>
//   <Text style={{color: 'white'}}>Welcome to consistent.ly!</Text>
//   <Text style={{color: 'blue'}}
//       onPress={() => Linking.openURL('https://forms.gle/QwniWfidR5jZ62vFA')}>
//   Fill out our Google Form here.
//   </Text>
//   <StatusBar style="auto" />
//   </View>
// };

const SearchRoute = () => <Text>Search</Text>;

const ProfileRoute = () => <Text>Profile</Text>;


const App = () =>  {


  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'search', title: 'Search', icon: 'search' },
    { key: 'profile', title: 'History', icon: 'timeline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    search: SearchRoute,
    profile: ProfileRoute,
  });

  return (
    
      <BottomNavigation
      shifting={true}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7bd7c7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}; 

AppRegistry.registerComponent(appName, () => Main);