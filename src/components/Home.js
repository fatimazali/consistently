import { StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';

class Home extends Component {
  render() {
    return (
        <View style={styles.container}>
        <Text style={{color: 'black'}}>Welcome to consistent.ly!</Text>
        <Text style={{color: 'blue'}}
            onPress={() => Linking.openURL('https://forms.gle/QwniWfidR5jZ62vFA')}>
            Fill out our Google Form here.
        </Text>
        <StatusBar style="auto" />
        </View>
    )
    
  }
}

export default Home; // Don’t forget to use export default!

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});