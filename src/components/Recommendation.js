import { Text, View } from 'react-native';
import React, { Component } from 'react';
import styles from './Styles.js';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

class Recommendation extends Component {
  render() {
    return (
        <View>
            <Text style={styles.pageHeader}>             Top 3 Picks</Text> 
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
        </View>
    )
    
  }
}

export default Recommendation; // Don’t forget to use export default!




