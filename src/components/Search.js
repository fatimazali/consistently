import { Text, ScrollView } from 'react-native';
import React, { Component } from 'react';
import styles from './Styles.js';
import { IconButton, Title, Dialog, Colors , Card, Avatar, Paragraph, Searchbar, Modal, Portal, Button, Provider} from 'react-native-paper';

class Search extends Component {
    constructor(props) {
      super(props);
      this.state = {
        visible: false,
        searchQuery: '',
      };
    };
    
    render() {
      const hideDialog = () => this.setState({ visible: false });
      const showDialog = () => this.setState({ visible: true });
      const onChangeSearch = query => this.setState({searchQuery : query});

      return (
        <Provider>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={this.state.searchQuery}
          />

          <ScrollView>
            <Card>
              <Card.Content>
                <Title>Biking for Transportation</Title>
                <Paragraph>Card content</Paragraph>
              </Card.Content>
              <Card.Cover source={require('../images/biking.svg')} />
              <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
              </Card.Actions>
            </Card>

            <Card>
              <Card.Content>
                <Title>Ab Workout(Video or Class)</Title>
                <Paragraph>Card content</Paragraph>
              </Card.Content>
              <Card.Cover source={require('../images/abs.svg')} />
              <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
              </Card.Actions>
            </Card>
            
            <Card>
              <Card.Content>
                <Title>Power Yoga</Title>
                <Paragraph>Card content.</Paragraph>
              </Card.Content>
              <Card.Cover source={require('../images/yoga.svg')} />
              <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
              </Card.Actions>
            </Card>
          </ScrollView>
          
          <Portal>
            <Dialog visible={this.state.visible} onDismiss={hideDialog} contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
              <Dialog.Content>
                <Text style={styles.paragraph}>Add Activity</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <IconButton style={styles.bottomRightButton}
            icon="plus"
            color='black'
            size={70}s
            onPress = {showDialog}
          />
        </Provider>
      );
    }
  };

export default Search; // Don’t forget to use export default!