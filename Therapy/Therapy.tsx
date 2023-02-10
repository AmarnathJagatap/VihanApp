import {Text, Image, StyleSheet,  View, useWindowDimensions, TouchableOpacity, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import { Card, Title, Button, Paragraph } from 'react-native-paper'
import { Colors } from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../context/AuthContext';

  
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Mindfullness = ({navigation}) => {
  const {userData} = useContext(AuthContext)
  console.log(userData)

  return (
    <View style={{backgroundColor:Colors.light.background,flex:1}}>
      {userData?.user_info?.role==="doctor"?
      <View style={{flexDirection:'row'}}> 
            <TouchableOpacity onPress={()=>navigation.navigate('SessionList')}>      
                <LinearGradient
              // Button Linear Gradient
              colors={['#ffae00', '#ffde80', '#ffff80']} style={{width:windowWidth/2.5,height:windowHeight/4,margin:15, borderRadius:25,elevation:100,alignItems:"center",justifyContent:'center'}}>
                    <Image source={require('../../assets/session.png')} resizeMode="contain" style={{height:135,width:150}}/>
                    <Text style={{fontWeight:'800',fontSize:15,fontFamily:'serif',textAlign:'center'}}>Add Session with your patient</Text>
                </LinearGradient> 
            </TouchableOpacity> 
       
            <TouchableOpacity onPress={()=>navigation.navigate('Usernoteslist')}>      
                <LinearGradient
              // Button Linear Gradient
              colors={['#59b300', '#ccff99', '#e6ffcc']} style={{width:windowWidth/2.5,height:windowHeight/4,margin:15, borderRadius:25,alignItems:"center",justifyContent:'center'}}>
                <Image source={require('../../assets/summary.png')} resizeMode="contain" style={{height:120,width:120}}/>
                <Text style={{fontWeight:'800',fontSize:15,fontFamily:'serif',marginTop:10,textAlign:'center'}}>Add Notes and Things to do</Text>
                </LinearGradient>  
            </TouchableOpacity> 
        </View>:
        <View style={{flexDirection:'row'}}> 
        <TouchableOpacity onPress={()=>navigation.navigate('UserCreateSession')}>      
            <LinearGradient
          // Button Linear Gradient
          colors={['#ffae00', '#ffde80', '#ffff80']} style={{width:windowWidth/2.5,height:windowHeight/4,margin:15, borderRadius:25,elevation:100,alignItems:"center",justifyContent:'center'}}>
                <Image source={require('../../assets/session.png')} resizeMode="contain" style={{height:135,width:150}}/>
                <Text style={{fontWeight:'800',fontSize:15,fontFamily:'serif',textAlign:'center'}}>Create Session</Text>
            </LinearGradient> 
        </TouchableOpacity> 
   
        <TouchableOpacity onPress={()=>navigation.navigate('UserPastSession')}>      
            <LinearGradient
          // Button Linear Gradient
          colors={['#59b300', '#ccff99', '#e6ffcc']} style={{width:windowWidth/2.5,height:windowHeight/4,margin:15, borderRadius:25,alignItems:"center",justifyContent:'center'}}>
            <Image source={require('../../assets/summary.png')} resizeMode="contain" style={{height:120,width:120}}/>
            <Text style={{fontWeight:'800',fontSize:15,fontFamily:'serif',marginTop:10,textAlign:'center'}}>Past Sessions</Text>
            </LinearGradient>  
        </TouchableOpacity> 
       </View>
        }
        
    </View>
  )
}

export default Mindfullness

const styles = StyleSheet.create({})