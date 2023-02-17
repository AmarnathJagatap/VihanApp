import { ScrollView, StyleSheet, Text, View,Image, TouchableOpacity, Dimensions, ToastAndroid, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Entypo} from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Apilink } from '../../Constants/Apilink';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let token;
const Reflecback = () => {
  const [sessionNotes, setSessionNotes] = useState(null);
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getNotesData();
    }, 2000);
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

 


  return (
    <ScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <>   
        {sessionNotes?.things_to_remember.length>0?
         sessionNotes?.things_to_remember.map((item,index)=>(     
          <ScrollView style={styles.container}>  
              <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontFamily:'Poppins-Bold',fontSize:13}}>{item.date}</Text>
              <TouchableOpacity onPress={()=>{navigation.navigate('UserUpdateReflectback',{name:item.date,reflectBack:item})}}>
                                  <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:13}}>{item.title}</Text>

                
              </TouchableOpacity>
              
            </ScrollView> )):<></>}            
         
        </>

    </ScrollView>
  )
}

export default Reflecback

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      height:windowHeight/3,
      margin:10,
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
      height:windowHeight/15,
      marginVertical:5,
      marginHorizontal:10,
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