import { Text, ScrollView } from 'react-native';
import React, { Component } from 'react';
import styles from './Styles.js';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Home from './Home';
import activities_json from '../../data/activities.json';
import history_json from '../../data/history.json';
import user_json from '../../data/user.json';

class Recommendation extends Component {
    constructor(props) {
        console.log(props)
        super(props);
        this.state = {
            activity_vector: [], //Array of dictionaries, each dictionary is the activity's item vector
            user_vector: [],
            preferences_and_experience_weights: {}, //Dictionary with activity name as key and weight as value
            ranked: [], //Array of the activities, ordered by value of the dot product (higher value, better recommendation)
        };
    };

    getWeatherFromApi = () => {
        console.log('hey');
        return fetch('https://api.openweathermap.org/data/2.5/weather?zip=95014&appid=5dd419bb060b722ca2357dcabe755c61&units=imperial')
          .then((response) => response.json())
          .then((json) => {
            return json;
          })
          .catch((error) => {
            console.error(error);
          });
      };

    toExcludeOutdoorActivities = () => {
        let weather = this.getWeatherFromApi();
        // does null call or does it just return null for comparison? 
        console.log('weather is', weather);
        let result = true;
        // find possible reasons to return false
        if (weather.main.feels_like > 90 || weather.main.feels_like < 50) { // 
            result = false;
        }

        //if main
        console.log('result is', result);

      };

  /*
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
    this.setState(nextProps);
  }

  componentWillMount() {
    console.log("in componentWillMount")
    console.log(this.props)
    this.handlerRecc(this.props);
  }
  componentWillReceiveProps(nextProps) {
    console.log("in componentWillReceiveProps")
    console.log(nextProps)
    this.handlerRecc(nextProps);
  }

  componentWillReceiveProps(nextProps) {
    console.log("in componentWillReceiveProps")
    console.log(nextProps)
    //this.handlerRecc(nextProps.intensity, nextProps.focus, nextProps.duration, nextProps.affirmation,
    //  nextProps.hasWeights, nextProps.hasMat, nextProps.hasBike, nextProps.hasStepmill);
  }


shouldComponentUpdate (nextProps, nextState) {
  console.log('in shouldComponentUpdate')
  //this.setState(nextState)
  console.log(nextProps)
  console.log(nextProps !== this.props)
  return nextProps !== this.props
}

componentDidMount() {
  console.log("in componentDidMount")
  console.log(this.props)
  console.log(this.props.intensity)
}
*/
  
    // Returns a dictionary of weights for activities based on past history 
    get_user_preferences_and_experience_weights = () => {
        var columns = Object.keys(user_json[0]);
        for (i = 8; i < columns.length; i++) {
            var activity_name = columns[i].substring(22, columns[i].length-1); //Gets the activity name between the brackets
            this.state.preferences_and_experience_weights[activity_name] = (user_json[0][columns[i]].includes("try")) ? 3 : 1; //Prefers to try it, so higher weight of 3
        }
    };

    build_activity_vector = () => {
        for (let i = 0; i < activities_json.length; i++) {
            var activity = {
                activity_name : activities_json[i]['name'],
                intensity_1 : activities_json[i]['intensity-1'], // Light
                intensity_2 : activities_json[i]['intensity-2'], // Moderate
                intensity_3 : activities_json[i]['intensity-3'], // Vigorous
                intensity_4 : activities_json[i]['intensity-4'], // Extreme
                lower : activities_json[i]['targets-lower'],
                upper : activities_json[i]['targets-upper'],
                abdominal : activities_json[i]['targets-abdominal'],
                whole : activities_json[i]['targets-whole'],
                cardio : activities_json[i]['cardio'],
                strength : activities_json[i]['strength'], 
                met: activities_json[i]['activity-met-value'] // Using the MET value for Calorie display for the 3 recommended activities
            };
            this.state.activity_vector.push(activity);
        }
    };

    // Returns T or F, whether or not it is cardio 
    is_cardio = (activity) => {
        for (let i = 0; i < activities_json.length; i++) {
            if(activities_json[i]['name'] == activity) {
                if(activities_json[i]['cardio'] == 1) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        return false;
    };

    // Takes in google form and past history jsons and returns the user vector
    build_user_vector = (form_data) => {
        //Cardio and strength history of past 5 days
        let num_of_cardio = 0;
        let num_of_strength = 0;
        for (let i = 0; i < 5; i++) {
            if (this.is_cardio(history_json[i]['Type'])) {
                num_of_cardio++;
            } else {
                num_of_strength++;
            }
        }

        //Get previously done activities and new activities from form
        this.get_user_preferences_and_experience_weights();
        
        var activities_done_in_past_5_days = [];
        for (let i = 0; i < 5; i++) {
            activities_done_in_past_5_days.push(history_json[i]['Type']);
        }

        for(var key in this.state.preferences_and_experience_weights) {
            if(!(key in activities_done_in_past_5_days)) {
                this.state.preferences_and_experience_weights[key] += 3; //Activities not done in the past 5 days get an extra weightage (+3)
            } else {
                this.state.preferences_and_experience_weights[key] += 1; //Activities done in the past 5 days get (+1)
            }
        }

        var user = {
            activity_name : this.state.preferences_and_experience_weights,   //[Previously done activities, New activities preferred]
            intensity_1 : (this.state.intensity == 'light') ? 1 : 0, 
            intensity_2 : (this.state.intensity == 'moderate') ? 1 : 0, 
            intensity_3 : (this.state.intensity == 'vigorous') ? 1 : 0, 
            intensity_4 : (this.state.intensity == 'extreme') ? 1 : 0, 
            lower : (this.state.focus == 'lower') ? 1 : 0,
            upper : (this.state.focus == 'upper') ? 1 : 0,
            abdominal : (this.state.focus == 'abdominal') ? 1 : 0,
            whole : (this.state.focus == 'whole') ? 1 : 0,
            cardio : (num_of_cardio < num_of_strength) ? 3 : 1,
            strength : (num_of_strength < num_of_cardio) ? 3 : 1
        }
        this.state.user_vector.push(user);
    };

    // Returns an array of activities, sorted by dot product score (descending)
    compute_dot_product = () => {
        var activity_score = 0;
        for (i = 0; i < this.state.activity_vector.length; i++) {
            activity_score = 0; //Reset score back to 0 for each activity computation
            
            // Adjusts activity names from the activity vector to match the user vector, since 
            // activity names were simplified in the google form presented to the user.
            var activity_name = this.state.activity_vector[i]["activity_name"];
            if (activity_name == "Jumping Rope") {
                activity_name = "Jumping rope";
            } else if (activity_name == "Sun salutation yoga" || activity_name == "Power yoga") {
                activity_name = "Yoga";
            } else if (activity_name == "Sprinting") {
                activity_name = "Running";
            } else if (activity_name == "Step aerobics with 4 inch step" || activity_name == "Step aerobics with 6-8 inch step") {
                activity_name = "Step aerobics";
            }

            activity_score += this.state.user_vector[0]["activity_name"][activity_name];
            activity_score += this.state.user_vector[0]["intensity_1"] * this.state.activity_vector[i]["intensity_1"]; 
            activity_score += this.state.user_vector[0]["intensity_2"] * this.state.activity_vector[i]["intensity_2"]; 
            activity_score += this.state.user_vector[0]["intensity_3"] * this.state.activity_vector[i]["intensity_3"]; 
            activity_score += this.state.user_vector[0]["intensity_4"] * this.state.activity_vector[i]["intensity_4"]; 
            activity_score += this.state.user_vector[0]["lower"] * this.state.activity_vector[i]["lower"]; 
            activity_score += this.state.user_vector[0]["upper"] * this.state.activity_vector[i]["upper"]; 
            activity_score += this.state.user_vector[0]["abdominal"] * this.state.activity_vector[i]["abdominal"]; 
            activity_score += this.state.user_vector[0]["whole"] * this.state.activity_vector[i]["whole"]; 
            activity_score += this.state.user_vector[0]["cardio"] * this.state.activity_vector[i]["cardio"];
            activity_score += this.state.user_vector[0]["strength"] * this.state.activity_vector[i]["strength"];
            this.state.ranked.push({activity_name: this.state.activity_vector[i]["activity_name"], score: activity_score});
        }
        this.state.ranked.sort(function(a, b) { // Sorts the ranked list by its score
            return b.score - a.score;
        });
    };
    
    render() {
        this.build_activity_vector(); // Builds array of activities, each activity is in dictionary form
        this.build_user_vector(); // Builds user vector 
        this.compute_dot_product(); // Ranks the activities
        //this.toExcludeOutdoorActivities();
        console.log("IN RECOMMENDATION")
        console.log(this.state)

        // <div>
        //     <p> {this.state} </p>
        // </div>

        return (
            <ScrollView>
                <Text style={styles.pageHeader}>             Top 3 Picks</Text> 
                <Card>
                    <Card.Content>
                        <Title>Pilates</Title>
                        <Paragraph>Card content</Paragraph>
                    </Card.Content>
                    <Card.Cover source={require('../images/pilates.png')} />
                    <Card.Actions>
                        <Button>Cancel</Button>
                        <Button>Ok</Button>
                    </Card.Actions>
                </Card>
                <Card>
                    <Card.Content>
                        <Title>Running</Title>
                        <Paragraph>Card content</Paragraph>
                    </Card.Content>
                    <Card.Cover source={require('../images/running.png')} />
                    <Card.Actions>
                        <Button>Cancel</Button>
                        <Button>Ok</Button>
                    </Card.Actions>
                </Card>
                <Card>
                    <Card.Content>
                        <Title>Core Training</Title>
                        <Paragraph>Card content</Paragraph>
                    </Card.Content>
                    <Card.Cover source={require('../images/core.png')} />
                    <Card.Actions>
                        <Button>Cancel</Button>
                        <Button>Ok</Button>
                    </Card.Actions>
                </Card>
            </ScrollView>
        )
    }
}

export default Recommendation; // Don’t forget to use export default!




