import { Text } from 'react-native';
import React, { Component } from 'react';
import styles from './Styles.js';
import { IconButton, Colors , Modal, Portal, Button, Provider} from 'react-native-paper';

class Search extends Component {
    constructor(props) {
      super(props);
      this.state = {
        visible: false
      };
    };
    
    render() {
      return (
        <Provider>
          <Portal>
            <Modal visible={this.state.visible} onDismiss={() => this.setState({ visible: false })} contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
              <Text style={styles.paragraph}>Add Activity</Text>
            </Modal>
          </Portal>
          <IconButton style={styles.bottomRightButton}
            icon="plus"
            color='black'
            size={70}s
            onPress = {() => this.setState({ visible: true })}
          />
        </Provider>
      );
    }
  };

export default Search; // Don’t forget to use export default!