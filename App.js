import { StatusBar } from 'expo-status-bar';
// import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';

const App = () =>  {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      
      <StatusBar style="auto" />
    </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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