import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff3e6',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      fontSize: 60,
      fontFamily: 'Arial',
      alignItems: 'center',
      color: "black",
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    centerView: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      padding: 8,
    }, 
    pageHeader: {
      marginTop: 60,
      fontSize: 40,
      fontWeight: 'bold',
      left: -85
    },
    button: {
      backgroundColor: '#F8CDDA',
      paddingVertical: 12, 
      paddingHorizontal: 25, 
      borderRadius: 25
    },
    buttonText: {
      color: "white",
      fontSize: 18
    },
    bottomRightButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
    }

  });
  
