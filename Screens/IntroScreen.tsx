import { StyleSheet, Text, TouchableOpacity, View,Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import {FontAwesome} from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import Colors from '../Constants/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




const IntroScreen = ({navigation}) => {
  const [pressed, setPressed] = useState('');


  return (
    <View>
  <Text style={{ fontSize: 20, color:"#000",alignSelf:'center',marginTop:30,fontFamily:"Poppins-Regular"}}>Why are you here</Text>    
    <View style={{flexDirection:'row',marginTop:10}}>
    <TouchableOpacity onPress={()=>{setPressed("Overcome depression")}} style={[styles.cardImagecontainer, pressed==="Overcome depression"?styles.buttonBorder:null]}>
              <Image source={require('../assets/depression.png')} style={{borderRadius:20,width:windowWidth/2.10,height:windowHeight/7}}/>
              <Text style={{ fontSize: 14, color:"#000",alignSelf:'center',marginVertical:5}}>Overcome depression</Text>    
              {pressed==="Overcome depression" && (
                        <FontAwesome name='check-circle' size={20} color="#2ecc71" style={styles.icon} />
                        )}
      </TouchableOpacity> 
      <TouchableOpacity onPress={()=>{setPressed('Feel less anxious')}} style={[styles.cardImagecontainer,pressed==="Feel less anxious"?styles.buttonBorder:null]}>
              <Image source={require('../assets/anxious.png')} style={{borderRadius:20,width:windowWidth/2.10,height:windowHeight/7}}/>
              <Text style={{ fontSize: 14, color:"#000",alignSelf:'center',marginVertical:5}}>Feel less anxious</Text>    
              {pressed==="Feel less anxious" && (
                        <FontAwesome name='check-circle' size={20} color="#2ecc71" style={styles.icon} />
                        )}                             
                                      
                                      </TouchableOpacity>  
    </View>  
    <View>
    <View style={{flexDirection:'row'}}>
    <TouchableOpacity onPress={()=>{setPressed("Overcome social anxity")}} style={[styles.cardImagecontainer, pressed==="Overcome social anxity"?styles.buttonBorder:null]}>
              <Image source={require('../assets/anxiety.png')} style={{borderRadius:20,width:windowWidth/2.10,height:windowHeight/7}}/>
              <Text style={{ fontSize: 14, color:"#000",alignSelf:'center',marginVertical:5}}>Overcome social anxity</Text>    
              {pressed==="Overcome social anxity" && (
                        <FontAwesome name='check-circle' size={20} color="#2ecc71" style={styles.icon} />
                        )}  
              </TouchableOpacity> 
              <TouchableOpacity onPress={()=>{setPressed("Sleep Better")}} style={[styles.cardImagecontainer, pressed==="Sleep Better"?styles.buttonBorder:null]}>
              <Image source={require('../assets/sleep.png')} style={{borderRadius:20,width:windowWidth/2.10,height:windowHeight/7}}/>

              <Text style={{ fontSize: 14, color:"#000",alignSelf:'center',marginVertical:5}}>Sleep Better</Text>    
              {pressed==="Sleep Better" && (
                        <FontAwesome name='check-circle' size={20} color="#2ecc71" style={styles.icon} />
                        )}                             
                                      
                                      </TouchableOpacity>   
    </View> 
    <View style={{flexDirection:'row'}}>
    <TouchableOpacity onPress={()=>{setPressed("Stress Less")}} style={[styles.cardImagecontainer, pressed==="Stress Less"?styles.buttonBorder:null]}>
              <Image source={require('../assets/stress.png')} style={{borderRadius:20,width:windowWidth/2.10,height:windowHeight/7}}/>
          
              <Text style={{ fontSize: 14, color:"#000",alignSelf:'center',marginVertical:5}}>Stress Less</Text>    
              {pressed==="Stress Less" && (
                        <FontAwesome name='check-circle' size={20} color="#2ecc71" style={styles.icon} />
                        )}    
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{setPressed('Be more productive')}} style={[styles.cardImagecontainer, pressed==="Be more productive"?styles.buttonBorder:null]}>
              <Image source={require('../assets/prodcutive.png')} style={{borderRadius:20,width:windowWidth/2.10,height:windowHeight/7}}/>
              <Text style={{ fontSize: 14, color:"#000",alignSelf:'center',marginVertical:5}}>Be more productive</Text>    
              {pressed==="Be more productive" && (
                        <FontAwesome name='check-circle' size={20} color="#2ecc71" style={styles.icon} />
                        )}                           
                                      
                                      </TouchableOpacity>  
    </View> 

    {pressed.length>0?
    <>  
    <Button onPress={()=>{navigation.navigate('LoginScreen')}} style={{backgroundColor:Colors.light.white,margin:20,marginHorizontal:60,borderRadius:30}} uppercase={false} labelStyle={{fontFamily:'serif',fontWeight:'900'}} color={Colors.light.black}>Login</Button>
    <Text style={{color:Colors.light.black,alignSelf:'center',fontFamily:'serif',fontWeight:'bold'}}>or</Text>
    <Button onPress={()=>{navigation.navigate('RegisterScreen')}} style={{backgroundColor:Colors.light.white,margin:20,marginHorizontal:60,borderRadius:30}} uppercase={false} labelStyle={{fontFamily:'serif',fontWeight:'900'}} color={Colors.light.black}>Sign Up</Button>
    </>:
    <>
    </>}  

  
    </View>
    </View>

  )
}

export default IntroScreen

const styles = StyleSheet.create({
  cardImagecontainer:{
    backgroundColor: '#fff',
    height:windowHeight/5.2,
    width:windowWidth/2.15,
    padding:0,
    marginHorizontal:5,
    marginVertical:10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  }  ,
  buttonBorder:{
    borderWidth:3,
    borderColor:'#00A300',
  },  
  icon: {
    position: 'absolute',
    right: -1,
    top: -3,
  },
})