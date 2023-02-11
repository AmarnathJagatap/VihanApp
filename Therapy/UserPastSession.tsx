import {  Dimensions, KeyboardAvoidingView, RefreshControl, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../Constants/Colors'
import {MaterialCommunityIcons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Apilink } from '../Constants/Apilink';
import Checkbox from 'expo-checkbox';


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  
const windowHeight = Dimensions.get('window').height;
let token;
const UserPastSession = () => {
    const [sessionNotes, setSessionNotes] = useState(null);
    const [isChecked, setChecked] = useState(false);
    const [isChecked1, setChecked1] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);    

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      getNotesData();
      wait(2000).then(() => setRefreshing(false));
    }, []);

    const getNotesData = async()=>{
        await AsyncStorage.getItem('token').then((value) =>{
            if(value!==null){
              token = JSON.parse(value)
            }
          })
        await fetch(Apilink+`/auth/getnotes`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token,
            }
          })
        .then((response)=>response.json())

        .then((response)=>setSessionNotes(response?.session_notes))

    }
    useEffect(()=>{
        getNotesData();
    },[])

   

    const handleClick = async (mode, data) => {
        let final_session_notes = [];
        let final_things_to_do = [];
        if (mode === "session_notes") {
        getNotesData();
        ToastAndroid.showWithGravityAndOffset(
            "Completed",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
          final_session_notes = sessionNotes?.notes.map((item) => {
            if (item === data) {
              return null
            }
            else {
              return item
            }
          })
          final_session_notes = final_session_notes.filter(function (el) {
            return el != null;
          });
    
          const postdata = async () => {
            await AsyncStorage.getItem('token').then((value) =>{
                if(value!==null){
                  token = JSON.parse(value)
                }
              })    
            const response = await fetch(Apilink + '/auth/finishsession', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
              },
              body: JSON.stringify({
                "session_notes": final_session_notes,
                "things_to_remember": sessionNotes?.things_to_remember
              })
            })
            const data = await response.json()
            console.log(data)
          }
          postdata();
    
        }
        if (mode === "things_to_remember") {
            getNotesData();
            ToastAndroid.showWithGravityAndOffset(
                "Completed",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
          final_things_to_do = sessionNotes?.things_to_remember.map((item) => {
            if (item === data) {
              return null
            }
            else {
              return item
            }
          })
          final_things_to_do = final_things_to_do.filter(function (el) {
            return el != null;
          });
          console.log(final_things_to_do)
    
          const postdata = async () => {
            await AsyncStorage.getItem('token').then((value) =>{
                if(value!==null){
                  token = JSON.parse(value)
                }
              })     
            const response = await fetch(Apilink + '/auth/finishsession', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
              },
              body: JSON.stringify({
                "session_notes": sessionNotes?.notes,
                "things_to_remember": final_things_to_do
              })
            })
            const data = await response.json();
          }
          postdata();
        }
    
    
      }
  return (
    <ScrollView 
    style={styles.container}
     nestedScrollEnabled = {true}
     refreshControl={
         <RefreshControl
           refreshing={refreshing}
           onRefresh={onRefresh}
         />
       }
     >
     <KeyboardAvoidingView>
     <ScrollView style={{
         flex:1,
          backgroundColor:Colors.light.white, 
          borderRadius:10,
          height:windowHeight/2.5,
          margin:10}}
          nestedScrollEnabled = {true}>
         <Text style={{
             alignSelf:'center',
              fontFamily:'serif', 
              fontWeight:'bold', 
              fontSize:18, 
              marginVertical:5
              }}>
                 HomeWork
         </Text>
         
         {sessionNotes?.notes.length>0?
         sessionNotes?.notes.map((item,index)=>(
             <View
             key={index} 
             style={{
                 margin:10,
                 borderRadius:40,
                 elevation:10,
                 backgroundColor:Colors.light.tabIconSelected,
                 padding:10,
                 flexDirection:'row',
             }}>
                 <Text style={{
                     fontSize:17,
                     fontWeight:'900',
                     fontFamily:'serif',
                     color:Colors.light.white,
                     flexGrow:1,
                 }}>{index+1}. {item}</Text>
                <Checkbox
                style={{marginHorizontal:10}}
                    value={isChecked}
                    onValueChange={(newValue) => {setChecked(newValue)
                    handleClick("session_notes",item)}}
                    color={isChecked ? Colors.light.black : Colors.light.black}
                />

             </View>
         )):
         <View style={{
             margin:10,
             borderRadius:40,
             elevation:10,
             backgroundColor:Colors.light.background,
             padding:10,
             alignItems:'center'
         }}>
             <Text style={{
                 fontSize:17,
                 fontWeight:'900',
                 fontFamily:'serif',
                 color:Colors.light.text
             }}>Nothing to show</Text>
         </View>
            }
         
     </ScrollView>
     <ScrollView style={{
         flex:1, 
         backgroundColor:Colors.light.white,
          borderRadius:10,
          height:windowHeight/2.5,
          margin:10}}
          nestedScrollEnabled = {true}
     >
     <Text style={{
         alignSelf:'center',
         fontFamily:'serif', 
         fontWeight:'bold', 
         fontSize:18, 
         marginVertical:5
         }}>
         Things to Do
     </Text>
         
          {sessionNotes?.things_to_remember.length>0?
         sessionNotes?.things_to_remember.map((item,index)=>(
             <View
             key={index}  
             style={{
                 margin:10,
                 borderRadius:40,
                 elevation:10,
                 backgroundColor:Colors.light.tabIconSelected,
                 padding:10,
                 flexDirection:'row',
             }}>
                 <Text style={{
                     fontSize:17,
                     fontWeight:'900',
                     fontFamily:'serif',
                     color:Colors.light.white,
                     flexGrow:1,
                 }}>{index+1}. {item}</Text>
                 <Checkbox
                style={{marginHorizontal:10}}
                    value={isChecked1}
                    
                    onValueChange={(newValue) => {setChecked1(newValue)
                        handleClick("things_to_remember",item)}}
                    color={isChecked1 ? Colors.light.black : Colors.light.black}
                />
             </View>
         )):
         <View style={{
             marginHorizontal:10,
             marginVertical:10,
             borderRadius:40,
             backgroundColor:Colors.light.background,
             padding:10,
             alignItems:'center'
         }}>
             <Text style={{
                 fontSize:17,
                 fontWeight:'900',
                 fontFamily:'serif',
                 color:Colors.light.text
             }}>Nothing to show</Text>
         </View>
            }
         
 
     </ScrollView>
     </KeyboardAvoidingView>    
     </ScrollView>
  )
}

export default UserPastSession

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.light.background,
        flex:1
    }
})