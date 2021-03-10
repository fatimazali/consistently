import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: { 
      flex: 1,
      backgroundColor: '#aca9ff', // lightsteelblue
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff3e6' // off-white
    },
    containerHistory: { 
      flex: 1,
      backgroundColor: '#ffffff', // white
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ebe7f1', // off-white
      borderRadius: 25,
      margin:10,
      width: 410,
    },    
    header: {
      fontSize: 60,
      fontFamily: 'Arial',
      alignItems: 'center',
      color: "white",
      
    },
    subheader: {
      fontSize: 20,
      fontFamily: 'Arial',
      alignItems: 'center',
      color: "white",
    },
    subtitle: {
      marginLeft: 4,
      marginBottom: 4,
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'left',
    }, 
    subtitle2: {
      marginLeft: 4,
      marginBottom: -10,
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'left',
    }, 
    progressBar: {
      margin: 4,
    },
    body: {
      margin: 4,
      fontSize: 18,
      fontWeight: 'normal',
      textAlign: 'left',
    }, 
    body_bold: {
      margin: 4,
      fontSize: 18,
      fontWeight: 'normal',
      fontWeight: 'bold',
      textAlign: 'left',
    },     
    bodySpacing: {
      margin: 4,
      fontSize: 9,
      fontWeight: 'normal',
      textAlign: 'left',
    }, 
    centerView: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      padding: 8,
    }, 
    goButton: {
      display: 'flex'
      // marginTop: 10,
      // display: 'flex',
      // justifyContent: 'flex-end'
    },    
    homePageHeader: {
      justifyContent: 'flex-start',
      marginTop: 60,
      fontSize: 40,
      fontWeight: 'bold',
    },
    pageHeader: {
      justifyContent: 'flex-start',
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
    },
    hidden : {
      bottom: -400
    },
    snackBar : {
      flex: 1,
      justifyContent: 'space-between',
    }
  });
  
