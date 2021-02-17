import { Text, View, Linking} from 'react-native';
import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import styles from './Styles';
import { Card, Button, useTheme } from 'react-native-paper';

class Home extends Component {
  render() {
    return (
        <View style={styles.centerView}>
          <Text style={styles.header}>Welcome to consistent.ly!</Text>
          <Text style={styles.paragraph}> To get started, fill out our Google Form...</Text>
          <Button style={styles.button} mode="contained" onPress={() => Linking.openURL('https://forms.gle/QwniWfidR5jZ62vFA')}>
            Let's go!
          </Button>
        </View>
    )
    
  }
}

export default Home; // Don’t forget to use export default!
