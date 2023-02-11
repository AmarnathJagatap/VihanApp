import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import MyTask from './MyHome/MyTask';
import Reflecback from './MyHome/ReflectBack';
import MainHome from './MyHome/MainHome';
import { AuthContext } from '../Context/AuthContext';
import MySelfCare from './MyHome/MySelfCare';
import MyJourney from './MyHome/MyJourney';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Apilink } from '../Constants/Apilink';
import { removeToken } from '../Services/AsyncStorageService';
import UserTasks from './MyHome/UsersTask';
import UsersReflectBack from './MyHome/UsersReflectback';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let token;
const Myhome = ({navigation}) => {
  const {homeScreenItem,setHomeScreenItem} = useContext(AuthContext)

  const {setIsLoggedIn, setUserToken,userData} = React.useContext(AuthContext);
  const handleLogout = async() =>{
    await removeToken();
    setIsLoggedIn(false);
    setUserToken(null);
  }
    
  const {setUserData} = useContext(AuthContext);
  useEffect(()=>{
    getUserData();
   },[])
    const getUserData = async()=> {
      await AsyncStorage.getItem('token').then((value) =>{
        if(value!==null){
          token = JSON.parse(value)
        }
      })
      await fetch(Apilink+`auth/getuser`, {
      method: "GET",
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : token
      }
    })
    .then(response => response.json())
    .then(data => setUserData(data))
    .catch((err)=>Alert.alert(err.message))
  }
  return (
    <View>
    <LinearGradient
        // Button Linear Gradient
        colors={['#6264AF','#6275CF','#6276EF','#6277FF','#6288EC','#6299EF']} style={styles.container}>
      <View style={styles.header}>
          <View style={styles.propicrow}>
            <TouchableOpacity onPress={()=>{navigation.navigate('MyJourney')}}>
          <Image source={require('../assets/propic.jpg')} style={styles.profilePic} />
          </TouchableOpacity>
          <Text style={styles.name}>Hi Dhruv</Text>
          </View>
          <View style={styles.icons}>
            <Image source={require('../assets/brainstromskill.png')} style={styles.icon} />
            <Image source={require('../assets/sleep.png')} style={styles.icon} />
          </View>
      </View>
      <TouchableOpacity onPress={()=>{homeScreenItem==="Home"?setHomeScreenItem("My Self Care"):setHomeScreenItem(homeScreenItem)}}>
      <LinearGradient
        // Button Linear Gradient
        colors={['#FFFFFF','rgba(255, 255, 255, 8)','rgba(255, 255, 255, 5) @ 100%']} style={styles.button}>
                  <Text style={styles.buttonText}>{homeScreenItem==="Home"?"My Self Care":homeScreenItem}</Text>
                  {homeScreenItem==="Home"?<Entypo name="chevron-right" size={24} color="black" />:<></>}
      </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
    <Text onPress={()=>{handleLogout()}}>Logout</Text>
    {homeScreenItem==="Home"?<MainHome/>:<></>}
    {homeScreenItem==="TASK"?<MyTask/>:<></>}
    {homeScreenItem==="Users TASK"?<UserTasks/>:<></>}
    {homeScreenItem==="Reflect Back"?<Reflecback/>:<></>}
    {homeScreenItem==="Users Reflect Back"?<UsersReflectBack/>:<></>}
    {homeScreenItem==="My Self Care"?<MySelfCare/>:<></>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent:'space-between'
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
    paddingHorizontal: 80,
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
  },
  cardcontainer:{
    backgroundColor: '#fff',
    height:windowHeight/3.8,
    marginHorizontal:10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  }, 
  profilePicmeet:{
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight:10
  },
  meetingrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal:15,
    justifyContent:'space-between'
  },
  meetingrowname:{
    fontSize: 15,
    color:"#000",
  },
  meetingrowtime:{
    fontSize: 11,
    color:"#000",
  },
  cardImagecontainer:{
    backgroundColor: '#fff',
    height:windowHeight/5.2,
    width:windowWidth/2.15,
    padding:0,
    marginHorizontal:5,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  }
});

export default Myhome;