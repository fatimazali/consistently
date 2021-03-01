import { Text, ScrollView } from 'react-native';
import React, { Component } from 'react';
import styles from './Styles.js';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Home from './Home';

class Recommendation extends Component {

  constructor(props) {
          console.log(props)
          super(props);
  }

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
*/

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

  render() {
    console.log("IN RECOMMENDATION")
    console.log(this.state)
    return (
      <div>
        <p> {this.state} </p>
      </div>
      
    )
    
  }
  
}

export default Recommendation; // Don’t forget to use export default!




