// Profile.js
import { StyleSheet, Text } from 'react-native';
import React, { Component } from 'react';

class Profile extends Component {
  render() {
    return (
      <Text>Profile</Text>
    )
    
  }
}

export default Profile; // Don’t forget to use export default!

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
