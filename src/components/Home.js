import { Text, View, Linking, Picker, ScrollView} from 'react-native';
import React, { Component, PropTypes } from 'react';
import { StatusBar } from 'expo-status-bar';
import styles from './Styles';
import { Card, Button, useTheme, Paragraph, Title, Badge, Subheading, Headline, 
  Modal, Dialog, ProgressBar, Portal, IconButton, List, Provider, TextInput, RadioButton, Checkbox } from 'react-native-paper';
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

      let calsBurned = 540;
      let numWorkouts = 3;
      
    
      return (
        <View style={styles.container}>
            <Provider style={styles.container}>
            <Text style={styles.homePageHeader}> Welcome Annie</Text> 
            <ScrollView>
              <View
                style={{
                  height: 10.0,
                  width: '100%',
                  backgroundColor: '#fff3e6',
                }}
              />
              <Card style={{
                  height: 200.0,
                }}>
                    <Card.Content>
                        <Title>Our week </Title>
                        <Text style={styles.paragraph}>Calories Burned: </Text>
                        <Text style={styles.body}>{calsBurned}/1000 cal </Text>
              
                        <ProgressBar progress={0.7}/>

                        <Text style={styles.paragraph}>Workouts this week: </Text>
                        <Text style={styles.body}>{numWorkouts} </Text>          

                    </Card.Content>
              </Card>
              <View
                style={{
                  height: 10.0,
                  width: '100%',
                  backgroundColor: '#fff3e6',
                }}
              />
              <Card>
                    <Card.Content>
                        <Title>Daily Check-In </Title>
                        <Text style={styles.body}>Tell us how you're doing today so we can find the best workouts for you! </Text>
                        <IconButton icon='arrow-right-bold-circle' color='#6300ee' size={40} onPress={() => Linking.openURL('https://forms.gle/q4Es51t2ayKsJrDd9')}>
              </IconButton>
                    </Card.Content>
                    <Card.Cover source={require('../images/circuitTraining.png')} />
              </Card>
              <Text style={styles.subtitle}>Our week </Text>
              <Text style={styles.subtitle}>Daily Check-In </Text>
              <Text style={styles.body}>Tell us how you're doing today so we can find the best workouts for you! </Text>
              <IconButton icon='arrow-right-bold-circle' size={40} onPress={() => Linking.openURL('https://forms.gle/q4Es51t2ayKsJrDd9')}>
              </IconButton>
              </ScrollView>
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

