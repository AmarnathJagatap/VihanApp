import React from 'react';
import { View, Text, StyleSheet,Image, TouchableOpacity, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import Activities from './Activities';
import MyLogs from './MyLogs';

const Tab = createMaterialTopTabNavigator();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MyJourney = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="Tab1"
        tabBarOptions={{
          activeTintColor: '#000000',
          inactiveTintColor: '#808080',
          indicatorStyle: { backgroundColor: '#000000' },
          style: { backgroundColor: '#FFFFFF' },
        }}
      >
        <Tab.Screen name="Mood Tracker" component={Activities} />
        <Tab.Screen name="MY Trigger" component={MyLogs} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent:'space-between'
  },
  somecontainer: {
    backgroundColor: '#fff',
    height:windowHeight/3.8,
    padding: 30,
    paddingTop:50,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },
  container: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    padding: 20,
    margin: 20,
    marginTop: 40,
  },
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#000000',
  },
  propicrow:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    width:windowWidth/2.7,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight:10
  },
  headerContent: {
    marginLeft: 10,
  },
  name: {
    fontSize: 20,
    marginBottom: 5,
    color:"#FFF",
    fontFamily:'Poppins-Bold'
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    width: 22,
    height: 22,
    marginHorizontal:5,
    marginRight: 10,
  },
  button: {
    paddingHorizontal: 50,
    paddingVertical:17,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    borderTopLeftRadius:2,
    borderTopRightRadius:2,
    marginRight:-30,
    width:windowWidth/1.3,
    alignSelf: 'flex-end',
    marginVertical:1.5,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',    
  },
  buttonText: {
    color: '#000',
    fontSize:15,
    alignSelf:'center',
    fontFamily:'Poppins-Regular'
  },
});

export default MyJourney;
