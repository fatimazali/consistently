import { Text, View, Linking, ScrollView} from 'react-native';
import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import styles from './Styles';
import { Card, Button, useTheme, Paragraph, Title, Badge, Subheading, Headline, 
  Modal, Dialog, Portal, List, Provider, TextInput, RadioButton, Checkbox } from 'react-native-paper';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      hasSignedUp: true,
      text: '',
      value: 'first',
    };
  };
  
  signUpForm = () => {
    return (
      <View style={styles.centerView}>
        <Text style={styles.header}>Welcome to consistent.ly!</Text>
        <Text style={styles.paragraph}> To get started, fill out our Google Form...</Text>
        <Button style={styles.button} mode="contained" onPress={() => Linking.openURL('https://forms.gle/QwniWfidR5jZ62vFA')}>
          Let's go!
        </Button>
      </View>      
    );
  }
  
  dailyCheckIn = () => {
      const showDialog = () => this.setState({ visible: true });
      const hideDialog = () => this.setState({ visible: false });

      const setButtonChoice = value => this.setState({ value: value });
      const setTextEntered = text => this.setState({ text: text });
  
      const containerStyle = {backgroundColor: 'white', padding: 50};
      
    
      return (
        <View style={styles.centerView}>
          <Provider>
          <Text style={styles.header}>Welcome</Text>
          <Text style={styles.paragraph}>Here is how you're doing: </Text>
          <Badge size={150} style={{left:-100}}>18</Badge>
          <Title>Daily Check-In </Title>
          <Paragraph> Tell us how you're doing today so we can find the best workouts for you! </Paragraph>
          <Text> </Text>
    
          <Portal>
              <Dialog style={{ maxHeight: 450, alignSelf: "center" }} visible={this.state.visible} onDismiss={hideDialog}>
    
                <Dialog.ScrollArea>
                <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
    
                <Dialog.Title>Daily Check-In!</Dialog.Title>
                <Dialog.Content>
    
    
                  <Subheading>Today I prefer to...</Subheading>
                    <RadioButton.Group onValueChange={setButtonChoice} value={this.state.value}>
                      <RadioButton.Item label="slow down and recover!" value="gentle" />
                      <RadioButton.Item label="take it easy!" value="easy" />
                      <RadioButton.Item label="work up a good sweat!" value="moderate" />
                      <RadioButton.Item label="challenge myself!" value="hard" />
                      <RadioButton.Item label="go far beyond my comfort zone!" value="intense" />
                    </RadioButton.Group>
                  <Text> </Text>
    
                  <Subheading>I have __ min to workout today.</Subheading>
                    <TextInput
                      label="Enter min..."
                      value={this.state.text}
                      onChangeText={setTextEntered}
                    />
                  <Text> </Text>
    
                  <Subheading>My available equipment includes...</Subheading>
                      <Checkbox.Item label="weights" status="unchecked" />
                      <Checkbox.Item label="yoga mat" status="unchecked" />
                      <Checkbox.Item label="bike/stationary bike" status="unchecked" />
                      <Checkbox.Item label="bench press" status="unchecked" />
    
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialog}>Done</Button>
                </Dialog.Actions>
    
                </ScrollView>
                </Dialog.ScrollArea>
    
    
              </Dialog>
          </Portal>
          <Button icon="camera" mode="contained" onPress={showDialog}>
            Let's go!
          </Button>
          </Provider>
        </View> 
      );
    }    
  
  render() {
    const dailyCheckIn2 = <Text style={styles.header}>Welcome back to consistent.ly!</Text>;

    if (this.state.hasSignedUp) {
      return this.dailyCheckIn();
    }
    else {
      return this.signUpForm();
    }  
  }
}

export default Home; // Don’t forget to use export default!
