import { Text, View, Linking, Picker, ScrollView} from 'react-native';
import React, { Component, PropTypes } from 'react';
import { StatusBar } from 'expo-status-bar';
import styles from './Styles';
import { Card, Button, useTheme, Paragraph, Title, Badge, Subheading, Headline, 
  Modal, Dialog, ProgressBar, Portal, IconButton, List, Provider, TextInput, RadioButton, Checkbox } from 'react-native-paper';
import Recommendation from './Recommendation';
import activities_json from '../../data/activities.json';
// import user_json from '../../data/user-2.json';

// user1: has two cardio workouts this week and gets strength picks
import history_json from '../../data/history.json';
import user_json from '../../data/user.json';
// user2: has two strength workouts this week and gets cardio activity-based picks

// import history_json from '../../data/history-2.json';
// import user_json from '../../data/user-2.json';


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      hasSignedUp: false,
      activity_vector: [], //Array of dictionaries, each dictionary is the activity's item vector      
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
    let prev_date = new Date(workoutDate.slice(0,4), workoutDate.slice(5,7), workoutDate.slice(8,10));
    let millisecond_dif = Date.now() - prev_date;
    let days_diff = (millisecond_dif / (1000*60*60*24));
    return days_diff <= 7.0;
  
  };
  
  getCaloriesBurned = (total, workout) => {
    return total + workout['Total Energy'];
   
  };
  
  calculateCaloriesBurnedInLastWeek = () => {
    // if date within last 7 days, add calorie value
    let workoutsWithinLastWeek = history_json.filter(this.workoutIsInLastWeek);
    //console.log('last week?', workoutsWithinLastWeek);
    return [workoutsWithinLastWeek.length, workoutsWithinLastWeek.reduce(this.getCaloriesBurned, 0)];
  };

  isStrengthWorkout = (workout) => {
    const activityName = workout["Type"];
    console.log('aname', activityName);
    for (let i = 0; i < activities_json.length; i++) {   
      if (activities_json[i]['name'] ==  activityName) {
        console.log('astre', activities_json[i]['strength']);
        if (activities_json[i]['strength'] == 1) {
          return true;
        }
        else {
          return false;
        } 
      }
    }
    return false// whether this activity is strength or cardio based
  };

  calculateStrengthCardioBalance = () => {
    let workoutsWithinLastWeek = history_json.filter(this.workoutIsInLastWeek);
    const workoutCount =  workoutsWithinLastWeek.length;
    const strengthWorkouts = workoutsWithinLastWeek.filter(this.isStrengthWorkout)
    console.log('sw', strengthWorkouts);
    let strengthCount = 0; 
    strengthCount = strengthWorkouts.length;
    const cardioCount = workoutCount - strengthCount;
    return [workoutCount, strengthCount, cardioCount];
  };
//   findActivityType = (activityName) => {
//     for (let i = 0; i < activities_json.length; i++) {   
//       if (activities_json[i]['name'] ==  activityName) {
//         if (activities_json[i]['cardio'] == 1) {
//           return 'cardio';
//         }
//         if (activities_json[i]['strength'] == 1) {
//           return 'strength';
//         }
//       }  
// };

  signUpForm = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome to consistent.ly!</Text>
        <Text></Text>
        <Text style={styles.subheader}> To get started, fill out our Google Form...</Text>
        <Text></Text>
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

      // 1. user weekly cal goals
      // 2. calculate user's cals burned this week already

      // 3. calculate numWorkouts
      // 4. parse workoutGoal from user form 

      // let calsBurned = 540; // fetch this
      // let numWorkouts = 3;
      let workoutGoal = user_json[0]["If you selected to work out a specific amount of times a week, how often?"];
      let calsGoal = ((((user_json[0]["Weight (round to the nearest pound)"]/2.205)*1000*3.5)/1000)*5).toFixed(0);
      // calculate from age and weight
      // num workouts cardio and strength percentage 
      // lowrange =(((user_weight/2.205)*500*3.5)/1000)*
      // highrange = =
      let workoutBal = this.calculateStrengthCardioBalance();
      const strengthCount = workoutBal[1]; 
      const cardioCount = workoutBal[2]; 

      // 5. change text based on time of day 
      const results = this.calculateCaloriesBurnedInLastWeek();
      const numWorkouts = results[0];
      const calsBurned = results[1].toFixed(0);      
    
      return (
        <View style={styles.container}>
            <Provider style={styles.container}>
            <Text style={styles.homePageHeader}> Welcome Annie</Text> 
            <ScrollView>
              <View
                style={{
                  height: 20.0,
                  width: '100%',
                }}
              />
              <Card style={{
                  height: 288.0,
                  width: 410,
                  borderRadius: 40,
                }}>
                    <Card.Content>
                        <Text style={styles.subtitle}>This Week</Text>
                        <Text style={styles.body}>{calsBurned}/{calsGoal} cals burned</Text>
                        <ProgressBar style={styles.progressBar} progress={calsBurned/calsGoal}/>
                        <Text></Text>
                        <Text style={styles.body}>{numWorkouts}/{workoutGoal} workouts logged</Text>
                        <ProgressBar style={styles.progressBar} progress={numWorkouts/workoutGoal}/>
                        <Text></Text>
                        <Text style={styles.body}>{cardioCount}/{numWorkouts} cardio workouts</Text>
                        <ProgressBar style={styles.progressBar} progress={cardioCount/numWorkouts}/>
                        <Text></Text>
                        <Text style={styles.body}>{strengthCount}/{numWorkouts} strength workouts</Text>
                        <ProgressBar style={styles.progressBar} progress={strengthCount/numWorkouts}/>
                    </Card.Content>
              </Card>
              <View
                style={{
                  height: 20.0,
                }}
              />
              <Card style={{
                  height: 365.0,
                  width: 410,
                  borderRadius: 40,                  
                }}>
                    <Card.Content>
                        <Text style={styles.subtitle2}>Daily Check-In </Text>
                        <View
                          style={{
                            //alignItems: 'flex-start',
                            paddingVertical: 0,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                          }}>
                          <Text style={styles.body}>Let's find the best workouts for today!</Text>
                          <IconButton style={styles.goButton} icon='arrow-right-bold-circle' color='#680aec' size={44}  onPress={() => Linking.openURL('https://forms.gle/q4Es51t2ayKsJrDd9')}>
                          </IconButton>
                          </View>                       

                    </Card.Content>
                    <Card.Cover source={require('../images/circuitTraining.png')} />
              </Card>

              </ScrollView>
          </Provider>
        </View> 
      );
    }    

  
  render() {
    const dailyCheckIn2 = <Text style={styles.header}>Welcome back to consistent.ly!</Text>;

    if (!this.state.hasSignedUp) {
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

