// Profile.js
import { Text, View } from 'react-native';
import React, { Component } from 'react';
import user_data from '../../data/history.json'; 
import { DataTable } from 'react-native-paper';
import styles from './Styles.js'

class Profile extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.pageHeader}>Past History</Text>
        <View style={styles.containerHistory}>
        <DataTable style={styles.containerHistory}>
          <DataTable.Header style={styles.containerHistory}>
          <DataTable.Title >Date</DataTable.Title>
            <DataTable.Title>Activity</DataTable.Title>
            <DataTable.Title numeric>Duration</DataTable.Title>
            <DataTable.Title numeric>Cals</DataTable.Title>
          </DataTable.Header>

          {user_data.map(activity => {
            return (
              <DataTable.Row style={styles.containerHistory}>
                <DataTable.Cell> {activity['Start'].slice(5,10)} </DataTable.Cell>
                <DataTable.Cell> {activity['Type']} </DataTable.Cell>
                <DataTable.Cell numeric> {activity['Duration'].slice(0,4)} </DataTable.Cell>
                <DataTable.Cell numeric > {activity['Total Energy'].toFixed(2)} </DataTable.Cell>
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
        {/* <View
            style={{
              height: 10.0,
              width: '100%',
              //backgroundColor: '#fff3e6',
              //color: '#fff3e6'
            }}></View> */}

      </View>
    )
  }
}

export default Profile; // Don’t forget to use export default!

