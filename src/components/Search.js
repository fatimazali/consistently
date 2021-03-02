import { Text, ScrollView, SafeAreaView, StyleSheet, View, FlatList, TextInput, } from 'react-native';
import React, { Component, useState, useEffect } from 'react';
import styles from './Styles.js';
import { IconButton, Title, Dialog, Colors , Card, Avatar, Paragraph, Searchbar, Modal, Portal, Button, Provider} from 'react-native-paper';




class Search extends Component {

    constructor(props) {
      super(props);
      this.state = {
        visible: false,
        searchQuery: '',
        filteredDataSource: require('../../data/activities.json'),
        masterDataSource: require('../../data/activities.json'),
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
    
    render() {
      const hideDialog = () => this.setState({ visible: false });
      const showDialog = () => this.setState({ visible: true });
      const setSearch = query => this.setState({searchQuery : query});

      const ourData = require('../../data/activities.json');
      const setFilteredDataSource = someData => this.setState({filteredDataSource : someData});
      const setMasterDataSource = someData => this.setState({masterDataSource : someData});

      //setFilteredDataSource(ourData);
      //setMasterDataSource(ourData);

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
        return (
          // Flat List Item
          <Card>
            <Card.Content>
              <Title>{item.name}</Title>
              <Paragraph>{item.cardio ? 'CARDIO' : 'STRENGTH'}</Paragraph>
            </Card.Content>
            <Card.Cover source={require('../images/core.png')} />
            <Card.Actions>
              <Button>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>
        );
      };
    
      const ItemSeparatorView = () => {
        return (
          // Flat List Item Separator
          <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: '#C8C8C8',
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
      </SafeAreaView>
      );
    }
  };

export default Search; // Don’t forget to use export default!