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
        filteredDataSource: require('../../data/activities.json'),
        masterDataSource: require('../../data/activities.json'),
        snackBarVisible: false,
        activities: [],
        loadedActivities: false,
      };
    };
 
   
    
 
    searchstyles = StyleSheet.create({
      container: {
        backgroundColor: 'white',
      },
      itemStyle: {
        padding: 10,
      },
      textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
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
 
      const ourData = require('../../data/activities.json');
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


        if (this.state.loadedActivities) {
          return (
            // Flat List Item
            <Card>
              <Card.Content>
                <Title>{item.name}</Title>
                <Paragraph>{item.cardio ? 'CARDIO' : 'STRENGTH'}</Paragraph>
              </Card.Content>
              <Card.Cover source={img} />
              <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
              </Card.Actions>
            </Card>
          );
        }
        
      };
    
      const ItemSeparatorView = () => {
        return (
          // Flat List Item Separator
          <View
            style={{
              height: 5.0,
              width: '100%',
              backgroundColor: '#fff3e6',
            }}
          />
        );
      };
    
      const getItem = (item) => {
        // Function for click on an item
        alert('Id : ' + item.id + ' Title : ' + item.title);
      };
 
 
      return(
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <View style={this.searchstyles.container}>
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
            </View>
        </ScrollView>
          <Provider>
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
          </Provider>
          <View style={styles.snackBar}>
            <Button onPress={showSnackBar}>{this.state.snackBarVisible ? 'Hide' : 'Show'}</Button>
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
