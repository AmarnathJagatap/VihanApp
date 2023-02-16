import { Dimensions, KeyboardAvoidingView, RefreshControl, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../Constants/Colors'
import { Avatar, Button, TextInput } from 'react-native-paper'
import { Apilink } from '../../Constants/Apilink';
import AsyncStorage from '@react-native-async-storage/async-storage';


  
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
let token;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
const EditReflectBackNote = ({route,navigation}) => {
    const {reflectBack,name} = route.params;
    const [refreshing, setRefreshing] = React.useState(false);
    const [things, setThings] = useState();
    const [homework, setHomework] = useState('');
    const [editJournal, setEditJournal] = useState();

    useEffect(()=>{
        setEditJournal(reflectBack)
    },[])
    
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);

 
    const repalcingText = () =>{
        const number = reflectBack.notes.indexOf(name)
        console.log(number)
        if(number!==-1){
            reflectBack.notes[number] = homework
        }  
        updateThings();     
    }

 

    const updateThings = async()=>{
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
              "notes":reflectBack.notes       
            }
          })
        })
      .then((response)=>{response.json()})
      .then((response)=>console.log(response)) 
      setHomework('')
      ToastAndroid.showWithGravityAndOffset(
          "Edited go back and refresh",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );  
        
     navigation.navigate("MyHome");
  } 

    
   

    /* const postThings = async()=>{
        await AsyncStorage.getItem('token').then((value) =>{
            if(value!==null){
              token = JSON.parse(value)
            }
          })
        await fetch(Apilink+`/auth/updatenotes`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token,
            },
            body: JSON.stringify({
              "username": name,
              "session_notes": "",
              "things_to_remember": {
                "title": [homework],
                "date": CurrentDate,
                "notes":""
              }
            })
          })
        .then((response)=>{response.json()})
        .then((response)=>console.log(response)) 
        ToastAndroid.showWithGravityAndOffset(
            "Relfect Back is added Go Back and Refresh",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          ); 
        setHomework('')      
    } */
    
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
         borderRadius:10,
         margin:10}}
         nestedScrollEnabled = {true}>
        <Text style={{
            alignSelf:'center',
             fontFamily:'Poppins-Regular', 
             fontSize:15, 
             marginVertical:5
             }}>
                Edit note
        </Text>
        <View >
        <TextInput 
             mode='outlined'
             value={homework}
             style={{
                 marginHorizontal:22,
                 height:50,
                 backgroundColor:Colors.light.white,
                 marginVertical:10
                 }} 
            label={name}
            outlineColor={'rgba(0,0,0,0.55)'}
            activeOutlineColor={'rgba(0,0,0,0.65)'}
            onChangeText={(text)=>setHomework(text)}
        />
        {homework.length>0? <TouchableOpacity>
        <Button style={{backgroundColor:'rgba(0,0,0,0.45)',width:windowWidth/4,margin:10,alignSelf:'center'}} textColor="white" onPress={()=>{repalcingText()}}>Add</Button>
        </TouchableOpacity>:<></>}
       
        </View>
        
    </ScrollView>
    </KeyboardAvoidingView>    
    </ScrollView>
  )
}

export default EditReflectBackNote

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.light.white,
        flex:1
    },
    cardcontainer:{
        justifyContent:'space-evenly',
        backgroundColor: '#fff',
        height:windowHeight/12,
        marginVertical:5,
        marginHorizontal:22,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 10,
      }
})