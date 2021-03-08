import { Text, View, Linking, Picker, ScrollView} from 'react-native';
import React, { Component, PropTypes } from 'react';
import { StatusBar } from 'expo-status-bar';
import styles from './Styles';
import { Card, Button, useTheme, Paragraph, Title, Badge, Subheading, Headline, 
  Modal, Dialog, Portal, IconButton, List, Provider, TextInput, RadioButton, Checkbox } from 'react-native-paper';
import Recommendation from './Recommendation';
import user_activity_data from '../../data/history.json'; 

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      hasSignedUp: true,
      
      intensity: 'first',
      focus: 'first',
      duration: '15',
      affirmation: 'aff1',
      hasWeights: false,
      hasMat: false,
      hasBike: false,
      hasStepmill: false,
    };

  };


  workoutIsInLastWeek = (workout) => {
    // check whether a previous date is within 7 days of today
    const workoutDate = workout['Start'];
    console.log('wd', workoutDate);
    console.log(workoutDate.slice(0,4));
    console.log(workoutDate.slice(5,7));
    let prev_date = new Date(workoutDate.slice(0,4), workoutDate.slice(5,7), workoutDate.slice(8,10));

    let millisecond_dif = Date.now() - prev_date; // this is nan...
    let days_diff = (millisecond_dif / (1000*60*60*24));
    console.log("ddif", millisecond_dif);
  
    console.log('result it', (days_diff <= 7.0));
    return days_diff <= 7.0;java
  
  };
  
  getCaloriesBurned = (total, workout) => {
    return total + workout['Total Energy'];
   
  };
  
  calculateCaloriesBurnedInLastWeek = () => {
    // if date within last 7 days, add calorie value
    let workoutsWithinLastWeek = user_activity_data.filter(this.workoutIsInLastWeek);
    console.log('last week?', workoutsWithinLastWeek);
    return [workoutsWithinLastWeek.length, workoutsWithinLastWeek.reduce(this.getCaloriesBurned, 0)];
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

      const setIntensity = value => this.setState({ intensity: value });
      const setFocus = value => this.setState({ focus: value });
      const setDuration = value => this.setState({ duration: value });
      const setAffirmation = value => this.setState({ affirmation: value });

      const setHasWeights = () => this.setState({ hasWeights: !this.state.hasWeights });
      const setHasMat = () => this.setState({ hasMat: !this.state.hasMat });
      const setHasBike = () => this.setState({ hasBike: !this.state.hasBike });
      const setHasStepmill = () => this.setState({ hasStepmill: !this.state.hasStepmill });
  
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
    
    
                  <Subheading>Today, I prefer to...</Subheading>
                    <RadioButton.Group onValueChange={setIntensity} value={this.state.intensity}>
                      <RadioButton.Item label="take it easy! (light)" value="light" />
                      <RadioButton.Item label="work up a good sweat! (moderate)" value="moderate" />
                      <RadioButton.Item label="challenge myself! (vigorous)" value="vigorous" />
                      <RadioButton.Item label="gO hArD or gO hOmE! (extreme)" value="extreme" />
                    </RadioButton.Group>
                  <Text> </Text>

                  <Subheading>Today, I want to focus on my...</Subheading>
                    <RadioButton.Group onValueChange={setFocus} value={this.state.focus}>
                      <RadioButton.Item label="lower body" value="lower" />
                      <RadioButton.Item label="upper body" value="upper" />
                      <RadioButton.Item label="whole body" value="whole" />
                      <RadioButton.Item label="abodominals" value="abdominal" />
                    </RadioButton.Group>
                  <Text> </Text>
                  

                  <Subheading>I have __ min to workout today.</Subheading>
                  <Picker
                    selectedValue={this.state.duration}
                    style={{ height: 50, width: 150 }}
                    onValueChange={setDuration}
                  >
                    <Picker.Item label="15" value="15" />
                    <Picker.Item label="30" value="30" />
                    <Picker.Item label="45" value="45" />
                    <Picker.Item label="60" value="60" />
                    <Picker.Item label="75" value="75" />
                    <Picker.Item label="90" value="90" />
                  </Picker>
                  <Text> </Text>
    
                  <Subheading>My available equipment includes...</Subheading>
                      <Checkbox.Item onPress={setHasWeights} label="weights" status={this.state.hasWeights ? 'checked' : 'unchecked'} />
                      <Checkbox.Item onPress={setHasMat} label="yoga mat" status={this.state.hasMat ? 'checked' : 'unchecked'} />
                      <Checkbox.Item onPress={setHasBike} label="bike/stationary bike" status={this.state.hasBike ? 'checked' : 'unchecked'} />
                      <Checkbox.Item onPress={setHasStepmill} label="stepmill" status={this.state.hasStepmill ? 'checked' : 'unchecked'} />
                  <Text> </Text>

                  <Subheading>Today's affirmation:</Subheading>
                    <Picker
                    selectedValue={this.state.affirmation}
                    style={{ height: 50, width: 450 }}
                    onValueChange={setAffirmation}
                  >
                    <Picker.Item label="I am a workout warrior!" value="aff1" />
                    <Picker.Item label="I am becoming stronger both mentally and physically!" value="aff2" />
                    <Picker.Item label="Soreness is weakness leaving my body!" value="aff3" />
                    <Picker.Item label="Hustle for that muscle!" value="aff4" />
                    <Picker.Item label="Let’s release those endorphins!" value="aff5"  />
                  </Picker>
                  <Text> </Text>
    
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialog}>Done</Button>
                </Dialog.Actions>
    
                </ScrollView>
                </Dialog.ScrollArea>
    
    
              </Dialog>
          </Portal>
          <IconButton icon='arrow-right-bold-circle' size={40} onPress={() => Linking.openURL('https://forms.gle/q4Es51t2ayKsJrDd9')}>
          </IconButton>
          </Provider>
        </View> 
      );
    }    

  
  render() {
    const dailyCheckIn2 = <Text style={styles.header}>Welcome back to consistent.ly!</Text>;
    const results = this.calculateCaloriesBurnedInLastWeek();
    // 1000 calories for now?
    const days = results[0];
    const calsBurned = results[1];
    console.log("days", days);
    console.log("cals are", calsBurned);

    if (this.state.hasSignedUp) {
      console.log("hi!!!!")
      console.log(this.state)
      console.log(this.props)
      return this.dailyCheckIn();
    }
    else {
      return this.signUpForm();
    }  
  }
}

/*
class DataPipe extends Component {

  constructor(props) {
          super(props);
          this.handler = this.handler.bind(this);
  }

  handler(tn, fo, du, af, hw, hm, hb, hs) {
    this.setState({
      intensity: tn,
      focus: fo,
      duration: du,
      affirmation: af,
      hasWeights: hw,
      hasMat: hm,
      hasBike: hb,
      hasStepmill: hs,
    });
  }

  render() {
    console.log('IN DATAPIPE')
    console.log(this.state)
    return (
      <Home handler = {this.handler} />
    )
    
  }
  
}
*/


export default Home; // Don’t forget to use export default!

