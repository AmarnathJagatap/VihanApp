import { Dimensions, KeyboardAvoidingView, RefreshControl, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../Constants/Colors'
import {TextInput } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient';
import {FontAwesome} from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Apilink } from '../../Constants/Apilink';


  
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
let token;

const UserUpdateReflectBack = ({route,navigation}) => {
    const {reflectBack} = route.params;   
    const [Notes, setNotes]= useState('');
    
    const updateNotes = async()=>{
        await AsyncStorage.getItem('token').then((value) =>{
            if(value!==null){
              token = JSON.parse(value)
            }
          })
        await fetch(Apilink+`/auth/editnotes`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token,
            },
            body: JSON.stringify({
              "session_notes": "",
              "things_to_remember":{
                "title": reflectBack.title,
                "date": reflectBack.date,
                "notes":Notes              
              }
            })
          })
        .then((response)=>{response.json()})
        .then((response)=>console.log(response)) 
        ToastAndroid.showWithGravityAndOffset(
            "Task Updated go back and Refresh",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        setNotes('')
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
              
        <TextInput 
             mode='outlined'
             value={Notes}
             style={{
                 marginHorizontal:22,
                 height:50,
                 backgroundColor:Colors.light.white,
                 marginVertical:10
                 }} 
            label="Add Notes"
            outlineColor={'rgba(0,0,0,0.55)'}
            activeOutlineColor={'rgba(0,0,0,0.65)'}
            onChangeText={(text)=>setNotes(text)}
        />
        <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:15}}>Previous Notes : {reflectBack.notes}</Text>
        {Notes.length>0?<TouchableOpacity onPress={()=>{updateNotes()}}>
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

export default UserUpdateReflectBack

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
        width:windowWidth/3,
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