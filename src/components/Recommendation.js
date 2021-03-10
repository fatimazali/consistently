import { Text, ScrollView } from 'react-native';
import React, { Component } from 'react';
import styles from './Styles.js';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Home from './Home';
import activities_json from '../../data/activities.json';
// user1: has two cardio workouts this week and gets strength picks
// import history_json from '../../data/history.json';
// import user_json from '../../data/user.json';
// import checkin_json from '../../data/dailyCheckIn.json';
// user2: has two strength workouts this week and gets cardio activity-based picks
import history_json from '../../data/history-2.json';
import user_json from '../../data/user-2.json';
import checkin_json from '../../data/dailyCheckIn2.json';

class Recommendation extends Component {
    constructor(props) {
        console.log(props)
        super(props);
        this.state = {
            activity_vector: [], //Array of dictionaries, each dictionary is the activity's item vector
            user_vector: [],
            preferences_and_experience_weights: {}, //Dictionary with activity name as key and weight as value
            ranked: [], //Array of the activities, ordered by value of the dot product (higher value, better recommendation)
            weather: {}, // Weather data for user's zipcode 
            weatherLoaded: false, 
            intensity: "", //light, moderate, vigorous, extreme 
            focus: "", //lower, upper, abdominal, whole
            user_weight: 0,
            duration: 0, //15-90
            equipment: [], //Array of Strings - equipment that is available to the user
            user_time: 30, // default in case of any issues in user data 
            checkInLoaded: false,
            recommendationMade: false
        };
    };

    // Get data from Daily Check-In and set state
    getCheckInData = () => {
        var checkin = checkin_json[0];
        this.state.intensity = checkin['intensity']
        this.state.focus = checkin['focus']
        this.state.duration = checkin['duration']
        for (var key in checkin) {
            if (checkin.hasOwnProperty(key) && checkin[key] == 1) {
                this.state.equipment.push(key);
            }
        };
        this.state.checkInLoaded = true;
    };
    
    getWeatherFromApi = async () => {
        try {
            const response = await fetch('https://api.openweathermap.org/data/2.5/weather?zip=95014&appid=5dd419bb060b722ca2357dcabe755c61&units=imperial');
            const json = await response.json();
            this.setState({
                weather: json,
                weatherLoaded: true
            });
        } catch (error) {
            console.error(error);
        }
      };

    toExcludeOutdoorActivities = () => {
        let result = false;
        if (this.state.weatherLoaded === true) {
            const weather = this.state.weather;
            const main = weather.main;
            if (main.feels_like > 90 || main.feels_like < 45) { // nested dict too?
                return true;
            }            
            if (weather.wind.speed > 20) {
                return true;
            }
            if ("snow" in weather && weather.snow['1h'] > 0) { // default val if not found or smt? null > 15 - .ff gives issues though
                return true;
            }
            if ("rain" in weather && weather.rain['1h'] > 0) { // default val if not found or smt? null > 15 - .ff gives issues though
                return true;
            }
            const thirty_min_before_sunrise = weather.sys.sunrise - 1800;  // 30 min = 1800 seconds
            const sixty_min_after_sunset = weather.sys.sunset + 3600 // 60 min = 3600 seconds
            if (!(weather.dt > thirty_min_before_sunrise &&  weather.dt < sixty_min_after_sunset)) { // if < 30min before sunrise or > 30min after sunset
                return true;
            }
        }
        return result;
      };

componentDidMount() {
    this.getWeatherFromApi();
};

    // Returns a dictionary of weights for activities based on past history 
    get_user_preferences_and_experience_weights = () => {
        var columns = Object.keys(user_json[0]);
        for (let i = 8; i < columns.length; i++) {
            var activity_name = columns[i].substring(22, columns[i].length-1); //Gets the activity name between the brackets
            this.state.preferences_and_experience_weights[activity_name] = (user_json[0][columns[i]].includes("try")) ? 3 : 1; //Prefers to try it, so higher weight of 3
        }
        this.state.user_weight = user_json[0]["Weight (round to the nearest pound)"];
    };

    build_activity_vector = () => { // hey 
        for (let i = 0; i < activities_json.length; i++) {
            const cals = ((((this.state.user_weight/2.205)*(activities_json[i]['activity-met-value'])*3.5)/1000)*5)*this.state.duration;
            // console.log('state here is', this.state);
            
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
                met: activities_json[i]['activity-met-value'], // Using the MET value for Calorie display for the 3 recommended activities
                outdoors: activities_json[i]['outdoors'],
                workout_calories: cals
            };
            this.state.activity_vector.push(activity);
        }
    };

    getIntensity = (activity) => {
        var intensity = "";
        if (activity["intensity_1"] == 1) {
            intensity = "Light";
        }
        if (activity["intensity_2"] == 1) {
            intensity = "Moderate";
        }
        if (activity["intensity_3"] == 1) {
            intensity = "Vigorous";
        }
        if (activity["intensity_4"] == 1) {
            intensity = "Extreme";
        }
        return intensity;
    }

    getFocus = (activity) => {
        var focus = "";
        if (activity["lower"] == 1) {
            focus = "Lower";
        }
        if (activity["upper"] == 1) {
            focus = "Upper";
        }
        if (activity["abdominal"] == 1) {
            focus = "Abdominal";
        }
        if (activity["whole"] == 1) {
            focus = "Whole";
        }
        return focus;
    }

    // Filter out all the activities that are required to be outdoors aka outdoor = 1
    filterByWeather = () => {
        var filteredActivities = [];        
        if((this.state.weatherLoaded === true) && this.toExcludeOutdoorActivities()) {
            for (let i = 0; i < this.state.activity_vector.length; i++) {
                if(this.state.activity_vector[i]["outdoors"] != 1) {
                    filteredActivities.push(this.state.activity_vector[i]);
                }
            }
            this.state.activity_vector = filteredActivities;
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
            intensity_1 : (this.state.intensity == 'light') ? 5 : 0,
            intensity_2 : (this.state.intensity == 'moderate') ? 5 : 0,
            intensity_3 : (this.state.intensity == 'vigorous') ? 5 : 0,
            intensity_4 : (this.state.intensity == 'extreme') ? 5 : 0,
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
        for (let i = 0; i < this.state.activity_vector.length; i++) {
            activity_score = 0; //Reset score back to 0 for each activity computation
            
            // Adjusts activity names from the activity vector to match the user vector, since 
            // activity names were simplified in the google form presented to the user.
            var activity_name = this.state.activity_vector[i]["activity_name"];
            if (activity_name == "Jumping Rope") {
                activity_name = "Jumping rope";
            } else if (activity_name == "Sun salutation yoga" || activity_name == "Power yoga") {
                activity_name = "Yoga";
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
            this.state.ranked.push({activity_name: this.state.activity_vector[i]["activity_name"], score: activity_score,
                                    intensity: this.getIntensity(this.state.activity_vector[i]), focus: this.getFocus(this.state.activity_vector[i]),
                                    cals: this.state.activity_vector[i]["workout_calories"], 
                                    cardio: this.state.activity_vector[i]["cardio"] ? "Cardio" : "Strength"});
        }
        this.state.ranked.sort(function(a, b) { // Sorts the ranked list by its score
            return b.score - a.score;
        });
    };

    filterByEquipment = () => {
        var filteredActivities = [];
        // console.log(this.state.equipment);
        for (let i = 0; i < this.state.ranked.length; i++) {
            if(this.state.ranked[i]["activity_name"] == "Stationary cycling" && !this.state.equipment.includes("stationary bike")) {
                continue;
            } else if (this.state.ranked[i]["activity_name"] == "Weight lifting" && !this.state.equipment.includes("weights")) {
                continue;
            } else if (this.state.ranked[i]["activity_name"] == "Stairmaster" && !this.state.equipment.includes("stepmill/stairmaster")) {
                continue;
            } else if (this.state.ranked[i]["activity_name"] == "Sun salutation yoga" && !this.state.equipment.includes("yoga mat")) {
                continue;
            } else if (this.state.ranked[i]["activity_name"] == "Power yoga" && !this.state.equipment.includes("yoga mat")) {
                continue;
            } else if (this.state.ranked[i]["activity_name"] == "Biking" && !this.state.equipment.includes("bike")) {
                continue;
            } else if (this.state.ranked[i]["activity_name"] == "Running stairs" && !this.state.equipment.includes("stairs")) {
                continue;
            } else {
                filteredActivities.push(this.state.ranked[i]);
            }
        }

        this.state.ranked = filteredActivities;
        this.setState({ recommendationMade: true }); //Once we make a recommendation, set to true
    }
    
    render() {
        this.getCheckInData(); // Get data from Daily Check-In
        if (!this.state.recommendationMade && this.state.checkInLoaded && this.state.weatherLoaded) {
            // console.log("activities", this.state.activity_vector);
            this.build_user_vector(); // Builds user vector
            this.build_activity_vector(); // Builds array of activities, each activity is in dictionary form\
            // console.log("final notfiltered", this.state.activity_vector);
            this.filterByWeather(); // must happen after compDidMount? otherwise: will be false until then which is fine
            this.compute_dot_product(); // Ranks the activities
            this.filterByEquipment(); //Post filter
            // console.log("final ranked", this.state.ranked);
        }

        
        return (
            <ScrollView style={{
            paddingVertical: 20,
          }}>
                <Text style={styles.homePageHeader}>  Top 4 Picks</Text> 
                {this.state.ranked.slice(0, 4).map((recommendation) => {
                    
                    let img = require("../images/circuitTraining.png"); //set general default image

                    if (recommendation["activity_name"].includes("yoga")) {
                      img = require("../images/yoga.png"); 
                    }
                    if (recommendation["activity_name"].includes("conditioning")) {
                      img = require("../images/conditioning.png"); 
                    }
                    if (recommendation["activity_name"].includes("cycling")) {
                      img = require("../images/stationaryCycling.png"); 
                    }
                    if (recommendation["activity_name"].includes("Upper")) {
                      img = require("../images/upperBody.png"); 
                    }
                    if (recommendation["activity_name"].includes("Lower")) {
                      img = require("../images/lowerBody.png"); 
                    }
                    if (recommendation["activity_name"].includes("Weight")) {
                      img = require("../images/weightlifting.png"); 
                    }
                    if (recommendation["activity_name"].includes("Swimming")) {
                      img = require("../images/swimming.png"); 
                    }
                    if (recommendation["activity_name"].includes("Hiking")) {
                      img = require("../images/hiking.png"); 
                    }
                    if (recommendation["activity_name"].includes("Ab")) {
                      img = require("../images/abs.png"); 
                    }
                    if (recommendation["activity_name"].includes("Running")) {
                      img = require("../images/running2.png"); 
                    }
                    if (recommendation["activity_name"].includes("Walking")) {
                      img = require("../images/walking.png"); 
                    }
                    if (recommendation["activity_name"].includes("Sprinting")) {
                      img = require("../images/sprinting.png"); 
                    }
                    if (recommendation["activity_name"].includes("Dancing")) {
                      img = require("../images/dancing.png"); 
                    }
                    if (recommendation["activity_name"].includes("Biking")) {
                      img = require("../images/biking.png"); 
                    }
                    if (recommendation["activity_name"].includes("Pilates")) {
                      img = require("../images/pilates.png"); 
                    }
                    if (recommendation["activity_name"].includes("aerobics")) {
                      img = require("../images/running3.png"); 
                    }

                    let classification = recommendation['cardio'] ? 'CARDIO' : 'STRENGTH';

            
                    return (
                        <Card>
                            <Card.Content>
                            <Title styles={styles.body_bold}>{recommendation["activity_name"]}</Title>
                                <Paragraph> {this.state.duration + " MINS" + " | " + recommendation["cals"].toFixed(2) + " CALS"}</Paragraph>
                            </Card.Content>
                            <Card.Actions>
                                <Button mode="contained" color="#d8d6ff" borderRadius="25">{classification}</Button>
                                <Text>   </Text>
                                <Button mode="contained" color="#d8d6ff" borderRadius="25">{recommendation["intensity"]}</Button>
                                <Text>   </Text>
                                <Button mode="contained" color="#d8d6ff" borderRadius="25">{recommendation["focus"]}</Button>
                            </Card.Actions>
                            <Card.Cover source={img} />
                        </Card>

                )})}
            </ScrollView>
         )
    }
}

export default Recommendation; // Don’t forget to use export default!




