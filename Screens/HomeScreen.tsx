import React from 'react';
import {View, SafeAreaView,TouchableOpacity, Image, Dimensions} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons,Ionicons} from '@expo/vector-icons'
import {createStackNavigator} from '@react-navigation/stack';


import Myhome from '../HomeScreens/Myhome';
import MyJournal from '../HomeScreens/MyJournal';
import TrackTrigger from '../HomeScreens/TrackTrigger';
import Community from '../HomeScreens/Community';
import Colors from '../Constants/Colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const CustomBarButton = ({children, onPress})=>(

  <TouchableOpacity
  style={{
    justifyContent:'center',
    alignItems:'center',
  }}
  onPress={onPress}>
    <View style={{
      width:windowWidth/3.8,
      height:40,
      borderRadius:40,
      backgroundColor:'#fff'
    }}>
      {children}
    </View>

  </TouchableOpacity>
)



const AppScreen = ({navigation}) => {
 
  return (
    <SafeAreaView style={{flex: 1}}>
      <Tab.Navigator
      initialRouteName="Home"     
      screenOptions={{
        tabBarStyle: { backgroundColor: '#fff',height:windowHeight/12,borderTopLeftRadius:15,borderTopRightRadius:15,elevation:10,borderBottomLeftRadius:30,borderBottomRightRadius:30 },
        headerShadowVisible:false,
        tabBarActiveTintColor: Colors.ActiveIcon,
        tabBarInactiveTintColor:Colors.InActiveIcon,
        headerShown:false,
      }}
    >
     
     <Tab.Screen
        name="MyHome"
        component={Myhome}
        options={{
          tabBarShowLabel:false,
          tabBarIcon: ({ color, size }) => (            
                          <MaterialCommunityIcons name="compass" color={color} size={27}/>
          ),
          tabBarButton:(props)=>(
            <CustomBarButton {...props}/>            
          ), 
          headerShown:false          
        }}
      />
      <Tab.Screen
        name="MyJournal"
        component={MyJournal}
        options={{
            tabBarShowLabel:false,
          tabBarIcon: ({ color, size }) => (
            
            <Image source={require('../assets/classroom.png')} style={{width:27,height:27,tintColor:color}}/>
          ),
          tabBarButton:(props)=>(
            <CustomBarButton {...props}/>            
          ), 
          headerShown:false
        }}
      />
      
      <Tab.Screen
        name="TrackTrigger"
        component={TrackTrigger}        
        options={{
            tabBarShowLabel:false,
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../assets/scorerplayer.png')} style={{width:27,height:27,tintColor:color}}/>
          ),
          tabBarButton:(props)=>(
            <CustomBarButton {...props}/>             
          ),        
          headerShown:false
        }}
      />
      <Tab.Screen
        name="Account"
        component={Community}
        options={{
            tabBarShowLabel:false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-multiple-outline" color={color} size={27}/>
          ),
          tabBarButton:(props)=>(
            <CustomBarButton {...props}/>            
          ), 
          headerShown:false          
        }}
      />
      
    </Tab.Navigator>
    </SafeAreaView>
  );
};


export default function HomeScreen({navigation}){
  return(
    <Stack.Navigator 
    initialRouteName='App'
    screenOptions={{
      headerShadowVisible:false,
      headerShown:false,
    }}
   >
      <Stack.Screen
      name="App"
      component={AppScreen}
      options={{headerShown: false}}
      />     
     

    </Stack.Navigator>
  )
}


