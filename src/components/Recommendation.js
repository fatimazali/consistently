import { Text, ScrollView } from 'react-native';
import React, { Component } from 'react';
import styles from './Styles.js';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Activity } from './Activity';
import activities_json from '../../data/activities.json';

class Recommendation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activity_vector: [], //Array of dictionaries, each dictionary is the activity's item vector
            user_vector: []
        };
    };

    build_activity_vector = () => {
        for (let i = 0; i < activities_json.length; i++) {
            var activity = {
                name : activities_json[i]['name'],
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

    // Need to draw info from google form and past history data
    build_user_vector = () => {
        var user = {
            name : "change this",   //[Previously done activities, New activities preferred]
            intensity_1 : (this.state.intensity == 'light') ? 1 : 0, 
            intensity_2 : (this.state.intensity == 'moderate') ? 1 : 0, 
            intensity_3 : (this.state.intensity == 'vigorous') ? 1 : 0, 
            intensity_4 : (this.state.intensity == 'extreme') ? 1 : 0, 
            lower : (this.state.focus == 'lower') ? 1 : 0,
            upper : (this.state.focus == 'upper') ? 1 : 0,
            abdominal : (this.state.focus == 'abdominal') ? 1 : 0,
            whole : (this.state.focus == 'whole') ? 1 : 0,
            cardio : 'change this',
            strength : 'change this'
        }
        this.state.user_vector.push(user);
    };

    compute_dot_product = () => {
        var ranked = []; //Array of the activities, ordered by value of the dot product (higher value, better recommendation)
        var activity_score = 0;
        for (i = 0; i < this.state.activity_vector; i++) {
            activity_score = 0; //Reset score back to 0 for each activity computation
            // activity_score += this.state.activity_vector[i]['name']
            activity_score += this.state.user_vector[0]['intensity_1'] * this.state.activity_vector[i]['intensity_1']; 
            activity_score += this.state.user_vector[0]['intensity_2'] * this.state.activity_vector[i]['intensity_2']; 
            activity_score += this.state.user_vector[0]['intensity_3'] * this.state.activity_vector[i]['intensity_3']; 
            activity_score += this.state.user_vector[0]['intensity_4'] * this.state.activity_vector[i]['intensity_4']; 
            activity_score += this.state.user_vector[0]['lower'] * this.state.activity_vector[i]['lower']; 
            activity_score += this.state.user_vector[0]['upper'] * this.state.activity_vector[i]['upper']; 
            activity_score += this.state.user_vector[0]['abdominal'] * this.state.activity_vector[i]['abdominal']; 
            activity_score += this.state.user_vector[0]['whole'] * this.state.activity_vector[i]['whole']; 
            // activity_score += this.state.activity_vector[i]['cardio'];
            // activity_score += this.state.activity_vector[i]['strength'];
            ranked.push({name: this.state.activity_vector[i]['name'], score: activity_score});
        }    
        
    }
    
    

    render() {
        this.build_activity_vector(); //Builds array of activities, each activity is in dictionary form
        this.build_user_vector(); //Builds user vector 
        console.log(this.state.activity_vector)
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




