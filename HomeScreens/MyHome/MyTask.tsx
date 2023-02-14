import { ScrollView, StyleSheet, Text, View,Image, TouchableOpacity, Dimensions, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Apilink } from '../../Constants/Apilink';
import {Entypo} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let token;

const MyTask = () => {
  const [sessionNotes, setSessionNotes] = useState(null);
  const navigation = useNavigation();
  

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

  return (
    <View>
        <View>
          <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:15}}>These are your task before next session.</Text>
          {sessionNotes?.notes.length>0?
            sessionNotes?.notes.map((item,index)=>(
          <TouchableOpacity onPress={()=>{navigation.navigate('UserTaskUpdate',{name:item.title,notesDetail:item})}}>
          <LinearGradient
            colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardcontainer}>
              <View style={{flexDirection:'row',alignItems:'center',padding:5}}>
                <View style={{marginHorizontal:20,width:30,height:30,borderRadius:30,backgroundColor:'#ffffff'}}><Text style={{textAlign:'center',marginTop:4}}>{index+1}</Text></View>
                <Text style={{marginHorizontal:10,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:13}}>{item.title}</Text>
                <Entypo name="chevron-right" style={{marginVertical:5}}  size={20}/>
              </View>                
          </LinearGradient>
          </TouchableOpacity>)):<></>}
        </View>
    </View>
  )
}

export default MyTask

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
      fontFamily:'Poppins-Regular'
    },
    cardcontainer:{
      backgroundColor: '#fff',
      height:windowHeight/16,
      marginVertical:5,
      marginHorizontal:30,
      borderRadius: 10,
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
      fontFamily:'Poppins-Regular',
    },
    meetingrowtime:{
      fontSize: 11,
      color:"#000",
      fontFamily:'Poppins-Regular'
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