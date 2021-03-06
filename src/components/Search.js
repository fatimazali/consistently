import { Text, ScrollView, SafeAreaView, StyleSheet, View, FlatList } from 'react-native';
import React, { Component, useState, useEffect } from 'react';
import styles from './Styles.js';
import { Snackbar, IconButton, Title, Dialog, TextInput, Colors , Card, Avatar, Paragraph, Searchbar, Modal, Portal, Button, Provider} from 'react-native-paper';
 
class Search extends Component {
 
    constructor(props) {
      super(props);
      this.state = {
        visible: false,
        searchQuery: '',
        filteredDataSource: require('../../data/search-db.json'),
        masterDataSource: require('../../data/search-db.json'),
        snackBarVisible: false,
        activities: [],
        loadedActivities: false,
      };
    };  
 
    searchstyles = StyleSheet.create({
      container: {
        backgroundColor: '#aca9ff',
        paddingLeft: 8,
      },
      itemStyle: {
        //padding: 8,
      },
      textInputStyle: {
        height: 50,
        borderWidth: 1,
        width: 410,
        //paddingLeft: 8,
        //margin: 20,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 10,
        borderColor: '#aca9ff',
        backgroundColor: '#FFFFFF',
      },
    });
 
    build_activities = () => {
      for (let i = 0; i < this.state.masterDataSource.length; i++) {
          if (this.state.activities.some(a => a['activity_name'] == this.state.masterDataSource[i]['name'])) {
            continue;
          }
          else {
            var activity = {
                activity_name : this.state.masterDataSource[i]['name'],
                image : "../images/" + this.state.masterDataSource[i]['image']
            };
            this.state.activities.push(activity);
        }
      }
      
    };
 
    componentDidMount() {
      console.log("in componentDidMount")
      if (this.state.loadedActivities == false) {
        this.build_activities();
        this.setState({loadedActivities: true});
      }
      console.log(this.state.activities)
      console.log(" ")
    }
    
    render() {
      //this.build_activities();
      const hideDialog = () => this.setState({ visible: false });
      const hideSnackBar = () => this.setState({snackBarVisible: false});
      
      const showDialog = () => this.setState({ visible: true });
      const showSnackBar = () => this.setState({snackBarVisible: true});
      const setSearch = query => this.setState({searchQuery : query});
 
      const ourData = require('../../data/search-db.json');
      const setFilteredDataSource = someData => this.setState({filteredDataSource : someData});
      const setMasterDataSource = someData => this.setState({masterDataSource : someData});
 
      const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          // Inserted text is not blank
          // Filter the masterDataSource and update FilteredDataSource
          const newData = this.state.masterDataSource.filter(function (item) {
            // Applying filter for the inserted text in search bar
            const itemData = item.name
              ? item.name.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setFilteredDataSource(newData);
          setSearch(text);
        } else {
          // Inserted text is blank
          // Update FilteredDataSource with masterDataSource
          setFilteredDataSource(this.masterDataSource);
          setSearch(text);
        }
      };
 
 
      const ItemView = ({ item }) => {
        console.log(this.state.loadedActivities);
        console.log(this.state.activities);
        console.log(item.name);

        let img = require("../images/circuitTraining.png"); //set general default image

        if (item.name.includes("yoga")) {
          img = require("../images/yoga.png"); 
        }
        if (item.name.includes("conditioning")) {
          img = require("../images/conditioning.png"); 
        }
        if (item.name.includes("cycling")) {
          img = require("../images/stationaryCycling.png"); 
        }
        if (item.name.includes("Upper")) {
          img = require("../images/upperBody.png"); 
        }
        if (item.name.includes("Lower")) {
          img = require("../images/lowerBody.png"); 
        }
        if (item.name.includes("Weight")) {
          img = require("../images/weightlifting.png"); 
        }
        if (item.name.includes("Swimming")) {
          img = require("../images/swimming.png"); 
        }
        if (item.name.includes("Hiking")) {
          img = require("../images/hiking.png"); 
        }
        if (item.name.includes("Ab")) {
          img = require("../images/abs.png"); 
        }
        if (item.name.includes("Running")) {
          img = require("../images/running2.png"); 
        }
        if (item.name.includes("Walking")) {
          img = require("../images/walking.png"); 
        }
        if (item.name.includes("Sprinting")) {
          img = require("../images/sprinting.png"); 
        }
        if (item.name.includes("Dancing")) {
          img = require("../images/dancing.png"); 
        }
        if (item.name.includes("Biking")) {
          img = require("../images/biking.png"); 
        }
        if (item.name.includes("Pilates")) {
          img = require("../images/pilates.png"); 
        }
        if (item.name.includes("aerobics")) {
          img = require("../images/running3.png"); 
        }

        // Find intensity to display
        const intensityMap = {
          "light" : item['intensity-1'],
          "moderate" : item['intensity-2'],
          "vigorous" : item['intensity-3'],
          "extreme" : item['intensity-4'],
        };
        let intensityLevel = Object.keys(intensityMap).find(key => intensityMap[key] === 1);
        
        // Find body part to display
        const focusMap = {
          "lower body" : item['targets-lower'],
          "upper body" : item['targets-upper'],
          "abdominal" : item['targets-abdominal'],
          "whole" : item['targets-whole'],
        };
        let focusLevel = Object.keys(focusMap).find(key => focusMap[key] === 1);

        // Specify if cardio or strength
        let classification = item.cardio ? 'CARDIO' : 'STRENGTH';

        if (this.state.loadedActivities) { 
          return (
            // Flat List Item
            <Card style={{
              //height: 288.0,
              width: 410,
              borderRadius: 20,
            }}>
              <Card.Content>
                <Text style={styles.subtitle}>{item.name}</Text>
              </Card.Content>
              <Card.Actions>
                <Button mode="contained" color="#d8d6ff" style={styles.tags}>{classification}</Button>
                <Text> </Text>
                <Button mode="contained" color="#d8d6ff" style={styles.tags}>{intensityLevel}</Button>
                <Text> </Text>
                <Button mode="contained" color="#d8d6ff" style={styles.tags}>{focusLevel}</Button>
              </Card.Actions>
              <Card.Cover source={img} />
              <Text> </Text>
            </Card>
          );
        }
        
      };
    
      const ItemSeparatorView = () => {
        return (
          // Flat List Item Separator
          <View
            style={{
              height: 10.0,
              width: '100%',
              backgroundColor: '#aca9ff',
            }}
          />
        );
      };
    
      const getItem = (item) => {
        // Function for click on an item
        alert('Id : ' + item.id + ' Title : ' + item.title);
      };
 
 
      return(
        <SafeAreaView style={styles.container}>
          <ScrollView>
              <TextInput
                style={this.searchstyles.textInputStyle}
                onChangeText={(text) => searchFilterFunction(text)}
                value={this.state.searchQuery}
                underlineColorAndroid="transparent"
                placeholder="Search workouts..."
              />
              
              <FlatList
                data={this.state.filteredDataSource}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={ItemView}
              />
        </ScrollView>
            <Portal>
              <Dialog visible={this.state.visible} onDismiss={hideDialog} contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
              <Dialog.Title>Add Activity</Dialog.Title>
                <Dialog.Content>
                  <TextInput mode='outlined' label="Activity"/>
                  <TextInput mode='outlined' label="Duration (in mins)"/>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => {hideDialog(); showSnackBar();}}>Submit</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
            <IconButton style={styles.bottomRightButton}
              icon="plus"
              color='black'
              size={70}
              onPress = {showDialog}
            />
          <View style={styles.snackBar}>
            <Snackbar
              visible={this.state.snackBarVisible}
              duration={2000}
              onDismiss={hideSnackBar}>
              Added!
            </Snackbar>
          </View>
      </SafeAreaView>
      );
    }
  };
 
export default Search; // Don’t forget to use export default!
