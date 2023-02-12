import { Dimensions, KeyboardAvoidingView, RefreshControl, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../Constants/Colors'
import {Button, TextInput } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient';
import {MaterialCommunityIcons,FontAwesome} from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Apilink } from '../../Constants/Apilink';


  
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
let token;

const AddMyTriger = ({navigation}) => {
    const [TriggerText, setTriggerText]= useState('');
    const [isButtonPressed, setIsButtonPressed] = useState(''); 
    
    const addHomework = async()=>{
        await AsyncStorage.getItem('token').then((value) =>{
            if(value!==null){
              token = JSON.parse(value)
            }
          })
        await fetch(Apilink+`/auth/postmylogs`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token,
            },
            body: JSON.stringify({
              my_logs:{
                feel:isButtonPressed,
                trigger:TriggerText,
                delete:false
              }
            })
          })
        .then((response)=>{response.json()})
        .then((response)=>console.log(response)) 
        ToastAndroid.showWithGravityAndOffset(
            "Trigger Added",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        setTriggerText('')
        setIsButtonPressed('')    
    } 
  return (
   <ScrollView 
   style={styles.container}
    nestedScrollEnabled = {true}
    >
    <KeyboardAvoidingView>
    <ScrollView style={{
        flex:1,
         borderRadius:10,
         margin:10}}
         nestedScrollEnabled = {true}>
        <View>
            <View style={{flexDirection:'row',width:windowWidth,justifyContent:'space-evenly',marginVertical:30}}>
                <TouchableOpacity
                        onPress={() => setIsButtonPressed("Good")}
                    >
                      <LinearGradient colors={['rgba(0,0,0,0.68)','rgba(0,0,0,0.38)','rgba(0,0,0,0.08)']}  style={[
                        styles.button,
                        isButtonPressed==="Good" ? styles.buttonPressed : null,
                        ]}>

                        <Text style={styles.buttonText}>Good</Text>
                        {isButtonPressed==="Good" && (
                        <FontAwesome name='check-circle' size={20} color="#2ecc71" style={styles.icon} />
                        )}
                        </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                        onPress={() => setIsButtonPressed("Bad")}
                    >
                      <LinearGradient colors={['rgba(0,0,0,0.68)','rgba(0,0,0,0.38)','rgba(0,0,0,0.08)']}  style={[
                        styles.button,
                        isButtonPressed==="Bad" ? styles.buttonBadPressed : null,
                        ]}>

                        <Text style={styles.buttonText}>Bad</Text>
                        {isButtonPressed==="Bad" && (
                        <FontAwesome name='check-circle' size={20} color="#FF0000" style={styles.icon} />
                        )}
                        </LinearGradient>
                </TouchableOpacity>

            </View>       
        <TextInput 
             mode='outlined'
             value={TriggerText}
             style={{
                 marginHorizontal:22,
                 height:50,
                 backgroundColor:Colors.light.white,
                 marginVertical:10
                 }} 
            label="Trigger"
            outlineColor={'rgba(0,0,0,0.55)'}
            activeOutlineColor={'rgba(0,0,0,0.65)'}
            onChangeText={(text)=>setTriggerText(text)}
        />
        {TriggerText.length>0?<TouchableOpacity onPress={()=>{addHomework()}}>
              <LinearGradient
                    colors={['rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)']} style={{height:windowHeight/20,borderRadius:10,alignItems:'center',justifyContent:'center',margin:15}}>
                      <Text style={{ fontSize: 12,color:"#ffffff",fontFamily:'Poppins-Regular'}}>Add</Text>
              </LinearGradient>
      </TouchableOpacity>     :<></>}
       
        </View>        
    </ScrollView>
    </KeyboardAvoidingView>    
    </ScrollView>
  )
}

export default AddMyTriger

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.light.white,
        flex:1
    },
    cardcontainer:{
        justifyContent:'space-evenly',
        backgroundColor: '#fff',
        height:windowHeight/15,
        marginVertical:5,
        marginHorizontal:22,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 10,
      },
      buttoncontainer:{
        width:windowWidth/4,
        height:windowHeight/18,
        alignItems:'center',
        flex:1,
        justifyContent:'center',
        marginHorizontal:10,
        borderRadius:12,
      },
      buttonBorder:{
        borderWidth:3,
        borderColor:'#00A300',
      }, 
      button: {
        width:windowWidth/4,
        height:windowHeight/18,
        alignItems:'center',
        flex:1,
        justifyContent:'center',
        marginHorizontal:10,
        borderRadius:10
      },
      buttonPressed: {
        borderWidth: 2.7,
        borderColor: '#2ecc71',
        borderRadius:12,

      },
      buttonBadPressed: {
        borderWidth: 2.7,
        borderColor: '#FF0000',
        borderRadius:12,
      },
      buttonText: {
        color: '#ffffff',
      },
      icon: {
        position: 'absolute',
        right: -1,
        top: -3,
      },
})