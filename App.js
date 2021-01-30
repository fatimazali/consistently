import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Linking, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to consistent.ly!</Text>
      <Text style={{color: 'blue'}}
          onPress={() => Linking.openURL('https://forms.gle/QwniWfidR5jZ62vFA')}>
      Fill out our Google Form here.
      </Text>
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
