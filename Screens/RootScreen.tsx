import { StyleSheet, Image,ActivityIndicator, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { useFonts } from 'expo-font';

import HomeScreen from './HomeScreen';


const Stack = createStackNavigator();

const Authandler=()=> {

  const [fontsLoaded] = useFonts({
    'Poppins-Black': require('../Constants/Fonts/Poppins-Black.ttf'),
    'Poppins-BlackItalic': require('../Constants/Fonts/Poppins-BlackItalic.ttf'),
    'Poppins-Bold': require('../Constants/Fonts/Poppins-Bold.ttf'),
    'Poppins-BoldItalic': require('../Constants/Fonts/Poppins-BoldItalic.ttf'),
    'Poppins-ExtraBold': require('../Constants/Fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraBoldItalic': require('../Constants/Fonts/Poppins-ExtraBoldItalic.ttf'),
    'Poppins-ExtraLight': require('../Constants/Fonts/Poppins-ExtraLight.ttf'),
    'Poppins-ExtraLightItalic': require('../Constants/Fonts/Poppins-ExtraLightItalic.ttf'),
    'Poppins-Italic': require('../Constants/Fonts/Poppins-Italic.ttf'),
    'Poppins-Light': require('../Constants/Fonts/Poppins-Light.ttf'),
    'Poppins-LightItalic': require('../Constants/Fonts/Poppins-LightItalic.ttf'),
    'Poppins-Medium': require('../Constants/Fonts/Poppins-Medium.ttf'),
    'Poppins-MediumItalic': require('../Constants/Fonts/Poppins-MediumItalic.ttf'),
    'Poppins-Regular': require('../Constants/Fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../Constants/Fonts/Poppins-SemiBold.ttf'),
    'Poppins-SemiBoldItalic': require('../Constants/Fonts/Poppins-SemiBoldItalic.ttf'),
    'Poppins-Thin': require('../Constants/Fonts/Poppins-Thin.ttf'),
    'Poppins-ThinItalic': require('../Constants/Fonts/Poppins-ThinItalic.ttf'),
  }); 

 
    const [isLoggedIn, setIsLoggedIn] = useState(true); 
    const [animating, setAnimating] = useState(false);  
    
  
    return (
      <NavigationContainer >
      <Stack.Navigator>
        {
          isLoggedIn? (
            <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            // Hiding header for Navigation Drawer
            options={{headerShown: false}}
            />
          )
          :(
            <>
           
            </>
          )
        }
  
        </Stack.Navigator> 
      </NavigationContainer>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#fff',
      justifyContent: 'center',  
    },
    image :{
      flex: 0.7,
      justifyContent: 'center',
      },
    text: {
      color: "white",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0",
    },
    activityIndicator: {
      alignItems: 'center',
      height: 80,
    },
    logosection : {
      color: "#493d8a",
      fontSize: 42,
      fontWeight: "bold",
      textAlign: "center",
    }
  });
  
const RootScreen = () => {
  return (
    <Authandler/>
  )
}

export default RootScreen