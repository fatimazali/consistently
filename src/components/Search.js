import { Text } from 'react-native';
import React, { Component } from 'react';
import styles from './Styles.js';
import { IconButton, Dialog, Colors , Modal, Portal, Button, Provider} from 'react-native-paper';

class Search extends Component {
    constructor(props) {
      super(props);
      this.state = {
        visible: false
      };
    };
    
    render() {
      const hideDialog = () => this.setState({ visible: false });
      const showDialog = () => this.setState({ visible: true });

      return (
        <Provider>
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