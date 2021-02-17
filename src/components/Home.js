import { Text, View, Linking, ScrollView} from 'react-native';
import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import styles from './Styles';
import { Card, Button, useTheme, Paragraph, Title, Badge, Subheading, Headline, 
  Modal, Dialog, Portal, List, Provider, TextInput, RadioButton, Checkbox } from 'react-native-paper';

class Home extends Component {

  state = {
    hasSignedUp: false
  }

  //this.onSignUp = this.onSignUp.bind(this);

  // onSignUp = () => {
  //   this.setState({
  //     hasSignedUp: true
  //   })
  // }
    // return (
        // <View style={styles.centerView}>
        //   <Text style={styles.header}>Welcome to consistent.ly!</Text>
        //   <Text style={styles.paragraph}> To get started, fill out our Google Form...</Text>
        //   <Button style={styles.button} mode="contained" onPress={() => Linking.openURL('https://forms.gle/QwniWfidR5jZ62vFA')}>
        //     Let's go!
        //   </Button>
        // </View>
    // )
     signUpForm = () => {
      //const { classes } = this.props;

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
      const [visible, setVisible] = React.useState(false);

      const showDialog = () => setVisible(true);
      const hideDialog = () => setVisible(false);
      const containerStyle = {backgroundColor: 'white', padding: 50};
    
      const [text, setText] = React.useState('');
      const [value, setValue] = React.useState('first');
      
    
      return (
        <View>
          <Provider>
          <Headline>Welcome</Headline>
          <Subheading>Here is how you're doing: </Subheading>
          <Badge>18</Badge>
            
          <Title>Daily Check-In </Title>
          <Paragraph> Tell us how you're doing today so we can find the best workouts for you! </Paragraph>
          <Text> </Text>
    
          <Portal>
              <Dialog style={{ maxHeight: 450, alignSelf: "center" }} visible={visible} onDismiss={hideDialog}>
    
                <Dialog.ScrollArea>
                <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
    
                <Dialog.Title>Daily Check-In!</Dialog.Title>
                <Dialog.Content>
    
    
                  <Subheading>Today I prefer to...</Subheading>
                    <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
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
                      value={text}
                      onChangeText={text => setText(text)}
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

    return (
      <View>
      {this.state.hasSignedUp ? this.signUpForm() : this.dailyCheckIn()}
      </View>
    )    
  }
}

export default Home; // Don’t forget to use export default!
