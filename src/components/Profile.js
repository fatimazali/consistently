// Profile.js
import { Text, View } from 'react-native';
import React, { Component } from 'react';
import m_data from '../data/michelle-workouts.json'; 
import r_data from '../data/rachel-allWorkouts.json';
import { DataTable } from 'react-native-paper';
import styles from './Styles.js'

class Profile extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.pageHeader}>Past History</Text>
        <DataTable style={styles.container}>
          <DataTable.Header style={styles.container}>
            <DataTable.Title>Activity</DataTable.Title>
            <DataTable.Title numeric>Average Heart Rate</DataTable.Title>
            <DataTable.Title numeric>Duration</DataTable.Title>
          </DataTable.Header>

          {m_data.map(activity => {
            return (
              <DataTable.Row style={styles.container}>
                <DataTable.Cell> {activity['Type']} </DataTable.Cell>
                <DataTable.Cell numeric > {activity['Average Heart Rate']} </DataTable.Cell>
                <DataTable.Cell numeric> {activity['Duration']} </DataTable.Cell>
              </DataTable.Row>
          )})}      

          <DataTable.Pagination
                  page={1}
                  numberOfPages={10}
                  onPageChange={page => {
                    console.log(page);
                  }}
                  label="Page 1 of 1"
            />
        </DataTable>
      </View>
    )
  }
}

export default Profile; // Don’t forget to use export default!

