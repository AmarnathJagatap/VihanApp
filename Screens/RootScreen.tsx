import React, { useEffect,useState, useContext} from 'react';
import { StyleSheet, View,Image,ActivityIndicator } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


import { Provider } from 'react-redux';
import {store } from '../Store/Store';
import { AuthContext } from '../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors  from '../Constants/Colors';
import HomeScreen from './HomeScreen';
import SignIn from './Login';
import RegisterScreen from './Registration';


const Stack = createStackNavigator();


const Authandler=()=> {
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('token').then((value) =>{
        if(value!==null){
          setIsLoggedIn(true);
          setUserToken(JSON.parse(value));
        }
      }      
    );

    }, 5000);
  }, []);


  const [animating, setAnimating] = useState(true);
  
  const {isLoggedIn, setIsLoggedIn,setUserToken} = useContext(AuthContext);
    
  const AnimatingScreen = () => {
    return(
      <View style={styles.container}>
         <View>
            <Image source={require('../assets/icon.png')} style={{alignSelf:'center',resizeMode:'center',marginHorizontal:10}}/>
        </View>  
        <ActivityIndicator
          color={Colors.light.tabIconSelected}
          size="large"
          style={styles.activityIndicator}
        />
      
      </View>
    )
  }

 

  if(animating) return <AnimatingScreen/>
  return (
    <NavigationContainer>
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
          <Stack.Screen
            name="LoginScreen"
            component={SignIn}
            options={{headerShown: false}}
          />
      
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{
              title: 'Register',           
              headerTintColor: Colors.light.tabIconSelected,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
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


export default Root=()=>{
    return(
        <Provider store={store}>        
          <Authandler/>
        </Provider>
    )
}