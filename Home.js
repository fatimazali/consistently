import { Text, View } from 'react-native';
import React, { Component } from 'react';
import styles from './App.js';
import { StatusBar } from 'expo-status-bar';

class Home extends Component {
  render() {
    return (
        <View style={styles.container}>
        <Text style={{color: 'white'}}>Welcome to consistent.ly!</Text>
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