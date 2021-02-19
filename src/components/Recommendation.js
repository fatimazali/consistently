import { Text, ScrollView } from 'react-native';
import React, { Component } from 'react';
import styles from './Styles.js';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

class Recommendation extends Component {
  render() {
    return (
        <ScrollView>
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
            <Card>
                <Card.Content>
                    <Title>Dancing</Title>
                    <Paragraph>Card content</Paragraph>
                </Card.Content>
                <Card.Cover source={require('../images/dancing.png')} />
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




