import React, { useContext } from 'react';
import { View, Text, StyleSheet,Image, TouchableOpacity, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import Activities from './Activities';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { AuthContext } from '../../Context/AuthContext';
import { Avatar, Caption, Title, TouchableRipple } from 'react-native-paper';
import { removeToken } from '../../Services/AsyncStorageService';


const Tab = createMaterialTopTabNavigator();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Card = () => {
  const {userData} = useContext(AuthContext)
  return (
      <LinearGradient
    
    // Button Linear Gradient
    colors={['#6264AF','#6275CF','#6276EF','#6277FF','#6288EC','#6299EF']} style={styles.somecontainer}>
  <View style={styles.header}>
      <View style={styles.propicrow}>
      <Image source={require('../../assets/propic.jpg')} style={styles.profilePic} />
      <Text style={styles.name}>Hi {userData?.user_info?.username}</Text>
      </View>
      <View style={styles.icons}>
       
      </View>
  </View>
  <TouchableOpacity onPress={()=>{}}>
  <LinearGradient
    // Button Linear Gradient
    colors={['#FFFFFF','rgba(255, 255, 255, 8)','rgba(255, 255, 255, 5) @ 100%']} style={styles.button}>
              <Text style={styles.buttonText}>My Account</Text>
              <Entypo name="chevron-right" size={24} color="black" />
  </LinearGradient>
  </TouchableOpacity>
</LinearGradient>
  );
};



const MyJourney = () => {
  const {userData} = useContext(AuthContext)
  const {setIsLoggedIn, setUserToken} = React.useContext(AuthContext);
  const handleLogout = async() =>{
    await removeToken();
    setIsLoggedIn(false);
    setUserToken(null);
  }
  return (
    <View style={styles.container}>
      <Card />
      
     

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <MaterialCommunityIcons name="factory" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{userData?.user_info?.company}</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>+91-900000009</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{userData?.user_info?.email}</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>{userData?.user_info?.profile_score}</Title>
            <Caption>Profile Score</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>6000</Title>
            <Caption>Steps Target</Caption>
          </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons name="firework" color="#f4338f" size={25}/>
            <Text style={styles.menuItemText}>Completed Targets</Text>
          </View>
        </TouchableRipple>
        
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons name="account-check" color="#f4338f" size={25}/>
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons name="account-settings" color="#f4338f" size={25}/>
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
        
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons name="typewriter" color="#f4338f" size={25}/>
            <Text style={styles.menuItemText}>Feedback</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={()=>{handleLogout()}}>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons name="logout" color="#f4338f" size={25}/>
            <Text style={styles.menuItemText}>Logout</Text>
          </View>
        </TouchableRipple>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoSection: {
    paddingHorizontal: 30,
    marginVertical: 25,
  },
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
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export default MyJourney;
