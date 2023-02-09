import { SafeAreaView, StyleSheet, Dimensions, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Activities from './Activities';
import MyLogs from './MyLogs';
import Colors from '../../Constants/Colors';



const Tab = createMaterialTopTabNavigator();
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TopTabs = () => {

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
        component={Activities}
       
      />
      <Tab.Screen
        name="MyJournal"
        component={MyLogs}
       
      />
      
    </Tab.Navigator>
    </SafeAreaView>
  )
}

export default TopTabs

const styles = StyleSheet.create({})