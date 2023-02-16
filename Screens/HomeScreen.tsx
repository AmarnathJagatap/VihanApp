import React, { useContext } from 'react';
import {View, SafeAreaView,TouchableOpacity, Image, Dimensions} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons,Ionicons} from '@expo/vector-icons'
import {createStackNavigator} from '@react-navigation/stack';


import Myhome from '../HomeScreens/Myhome';
import MyJournal from '../HomeScreens/MyJournal';
import TrackTrigger from '../HomeScreens/Triggers/TrackTrigger';
import Colors from '../Constants/Colors';
import { AuthContext } from '../Context/AuthContext';
import MyJourney from '../HomeScreens/MyHome/MyProfile';
import StressScore from '../QuizApp/Stressscore';
import GroupDetails from '../ScheduleGroup/GroupDetails';
import GroupData from '../ScheduleGroup/GroupData';
import CreateGroup from '../ScheduleGroup/CreateGroup';
import UserTaskDetailScreen from '../HomeScreens/MyHome/UserTaskDetailScreen';
import UserReflecBackDetailScreen from '../HomeScreens/MyHome/UserReflecBackDetailScreen';
import AddMyTriger from '../HomeScreens/Triggers/AddMyTriger';
import UserTaskUpdate from '../HomeScreens/MyHome/UserTaskUpdate';
import UserUpdateReflectBack from '../HomeScreens/MyHome/UserUpdateReflectBack';
import CheckHistory from '../HomeScreens/Triggers/CheckHistory';
import MoodTrackerHistory from '../HomeScreens/Triggers/MoodTrackerHistory';
import SpecificJournalDetail from '../HomeScreens/MyJournal/SpecificJournalDetail';
import EditJournalNote from '../HomeScreens/MyJournal/EditJounalNote';
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
  const {homeScreenItem,setHomeScreenItem} = useContext(AuthContext)
 
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
            <MaterialCommunityIcons onPress={()=>{setHomeScreenItem("Home")}} name="compass" color={color} size={27}/>
          ),
          tabBarButton:(props)=>(
            <CustomBarButton onPress={()=>{setHomeScreenItem("Home")}} {...props}/>            
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
        component={GroupData}
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
   
   >
      <Stack.Screen
      name="App"
      component={AppScreen}
      options={{headerShown: false}}
      />  

      <Stack.Screen
      name="MyJourney"
      component={MyJourney}
      options={{headerShown: false}}
      />   
      <Stack.Screen
      name="Quiz"
      component={StressScore}
      options={{headerShown: false}}
      />  
       <Stack.Screen
        name="GroupData"
        component={GroupData}
        options={{headerShown: false}}
     
      /> 
     <Stack.Screen
        name="GroupDetails"
        component={GroupDetails}
        options={{headerShown: false}}
 
      />  
      <Stack.Screen
        name="CreateGroup"
        component={CreateGroup}
        options={{headerShown: false}}   
      />  
     
     <Stack.Screen
        name="UserTaskDetailScreen"
        component={UserTaskDetailScreen}
        options={({ route }) =>
         ({ title: route.params.name, 
          headerTitleStyle:{fontFamily:'serif', fontSize:18, fontWeight:'bold'},
          headerLeft : props => 
          <View style={{flexDirection:'row'}}>
            <MaterialCommunityIcons onPress={()=>navigation.goBack()} name="chevron-left" size={25} style={{marginLeft:10,marginTop:8}}/>

            <Image
          source={require('../assets/man.png')}
          style={{ width: 40, height: 40, borderRadius: 40/2, marginLeft : 15 }} />
          </View>
         })}       
      />  

     <Stack.Screen
        name="UserReflecBackDetailScreen"
        component={UserReflecBackDetailScreen}
        options={({ route }) =>
         ({ title: route.params.name, 
          headerTitleStyle:{fontFamily:'serif', fontSize:18, fontWeight:'bold'},
          headerLeft : props => 
          <View style={{flexDirection:'row'}}>
            <MaterialCommunityIcons onPress={()=>navigation.goBack()} name="chevron-left" size={25} style={{marginLeft:10,marginTop:8}}/>

            <Image
          source={require('../assets/man.png')}
          style={{ width: 40, height: 40, borderRadius: 40/2, marginLeft : 15 }} />
          </View>
         })}       
      />  

      <Stack.Screen
        name="UserTaskUpdate"
        component={UserTaskUpdate}
        options={({ route }) =>
         ({ title: route.params.name, 
          headerTitleStyle:{fontFamily:'serif', fontSize:18, fontWeight:'bold'},
          headerLeft : props => 
          <View style={{flexDirection:'row'}}>
            <MaterialCommunityIcons onPress={()=>navigation.goBack()} name="chevron-left" size={25} style={{marginLeft:10,marginTop:8}}/>

            <Image
          source={require('../assets/man.png')}
          style={{ width: 40, height: 40, borderRadius: 40/2, marginLeft : 15 }} />
          </View>
         })}       
      /> 

<Stack.Screen
        name="UserUpdateReflectback"
        component={UserUpdateReflectBack}
        options={({ route }) =>
         ({ title: route.params.name, 
          headerTitleStyle:{fontFamily:'serif', fontSize:18, fontWeight:'bold'},
          headerLeft : props => 
          <View style={{flexDirection:'row'}}>
            <MaterialCommunityIcons onPress={()=>navigation.goBack()} name="chevron-left" size={25} style={{marginLeft:10,marginTop:8}}/>

            <Image
          source={require('../assets/man.png')}
          style={{ width: 40, height: 40, borderRadius: 40/2, marginLeft : 15 }} />
          </View>
         })}       
      /> 

      <Stack.Screen
        name="AddTrigger"
        component={AddMyTriger}
        options={() =>
         ({ title: "Add Trigger", 
          headerTitleStyle:{fontFamily:'serif', fontSize:18, fontWeight:'bold'},
          headerLeft : props => 
          <View style={{flexDirection:'row'}}>
            <MaterialCommunityIcons onPress={()=>navigation.goBack()} name="chevron-left" size={25} style={{marginLeft:10,marginTop:8}}/>
          </View>
         })}       
      />  

      <Stack.Screen
        name="Checkhistory"
        component={CheckHistory}
        options={() =>
         ({ title: "Trigger History", 
          headerTitleStyle:{fontFamily:'serif', fontSize:18, fontWeight:'bold'},
          headerLeft : props => 
          <View style={{flexDirection:'row'}}>
            <MaterialCommunityIcons onPress={()=>navigation.goBack()} name="chevron-left" size={25} style={{marginLeft:10,marginTop:8}}/>
          </View>
         })}       
      />  

    <Stack.Screen
        name="MoodTrackerHistory"
        component={MoodTrackerHistory}
        options={() =>
         ({ title: "Mood Tracker  History", 
          headerTitleStyle:{fontFamily:'serif', fontSize:18, fontWeight:'bold'},
          headerLeft : props => 
          <View style={{flexDirection:'row'}}>
            <MaterialCommunityIcons onPress={()=>navigation.goBack()} name="chevron-left" size={25} style={{marginLeft:10,marginTop:8}}/>
          </View>
         })}       
      />  

      <Stack.Screen
        name="SpecificJournalDetail"
        component={SpecificJournalDetail}
        options={({ route }) =>
        ({ title: route.params.name, 
         headerTitleStyle:{fontFamily:'serif', fontSize:18, fontWeight:'bold'},
         headerLeft : props => 
         <View style={{flexDirection:'row'}}>
           <MaterialCommunityIcons onPress={()=>navigation.goBack()} name="chevron-left" size={25} style={{marginLeft:10,marginTop:8}}/>

           <Image
         source={require('../assets/man.png')}
         style={{ width: 40, height: 40, borderRadius: 40/2, marginLeft : 15 }} />
         </View>
        })}        
      />  
       <Stack.Screen
        name="EditJournalNote"
        component={EditJournalNote}
        options={({ route }) =>
        ({ title: route.params.name, 
         headerTitleStyle:{fontFamily:'serif', fontSize:18, fontWeight:'bold'},
         headerLeft : props => 
         <View style={{flexDirection:'row'}}>
           <MaterialCommunityIcons onPress={()=>navigation.goBack()} name="chevron-left" size={25} style={{marginLeft:10,marginTop:8}}/>

           <Image
         source={require('../assets/man.png')}
         style={{ width: 40, height: 40, borderRadius: 40/2, marginLeft : 15 }} />
         </View>
        })}        
      />  
     

    </Stack.Navigator>
  )
}


