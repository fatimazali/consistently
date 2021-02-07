import { StatusBar } from 'expo-status-bar';
<<<<<<< HEAD
// import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
=======
import React from 'react';
import { StyleSheet, Linking, Text, View } from 'react-native';
>>>>>>> 00dac3bb7f54faca6f2f43c1513053a30b979874

const App = () =>  {
  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <Text>Open up App.js to start working on your app!</Text>
      
=======
      <Text style={{color: 'white'}}>Welcome to consistent.ly!</Text>
      <Text style={{color: 'blue'}}
          onPress={() => Linking.openURL('https://forms.gle/QwniWfidR5jZ62vFA')}>
      Fill out our Google Form here.
      </Text>
>>>>>>> 00dac3bb7f54faca6f2f43c1513053a30b979874
      <StatusBar style="auto" />
    </View>
  
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
}

AppRegistry.registerComponent(appName, () => Main);