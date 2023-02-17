import { Dimensions, KeyboardAvoidingView, RefreshControl, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../Constants/Colors'
import { Avatar, Button, TextInput } from 'react-native-paper'
import { Apilink } from '../../Constants/Apilink';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient'
import {FontAwesome} from '@expo/vector-icons'

  
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
let token;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
const SpecificJournalDetail = ({route,navigation}) => {
    const {myJournal,name} = route.params;
    const [journalText, setJournalText] = useState('');

    useEffect(()=>{
      setJournalText(myJournal.title)
    },[])

    const updateThings = async()=>{
      await AsyncStorage.getItem('token').then((value) =>{
          if(value!==null){
            token = JSON.parse(value)
          }
        })
      await fetch(Apilink+`/auth/updatemyjourney`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
          body: JSON.stringify({
            "my_journey" :{
              "date":myJournal.date,
              "title":journalText
            }
         
          })
        })
      .then((response)=>{response.json()})
      .then((response)=>console.log(response?.my_journey)) 
      ToastAndroid.showWithGravityAndOffset(
          "Journal Added",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );   
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
        <Text style={{
            alignSelf:'center',
             fontFamily:'Poppins-Regular', 
             fontSize:15, 
             marginVertical:5
             }}>
                Add Journal
        </Text>
        <View >
        
       
        </View>
        <View>
       <View style={{}}>
      <TextInput 
      multiline={true}
            value={journalText}
             mode='outlined'
             style={{
                 marginHorizontal:22,
                 height:windowHeight/3,
                 backgroundColor:Colors.light.white,
                 marginVertical:10
                 }} 
            outlineColor={'rgba(0,0,0,0.55)'}
            activeOutlineColor={'rgba(0,0,0,0.65)'}
            onChangeText={(text)=>setJournalText(text)}
        />
      {journalText.length>0? <TouchableOpacity>
        <Button style={{backgroundColor:'rgba(0,0,0,0.45)',width:windowWidth/4,margin:10,alignSelf:'center'}} textColor="white" onPress={()=>{updateThings()}}>Add</Button>
        </TouchableOpacity>:<></>}
         
      </View>               
      </View>
        
    </ScrollView>
    </KeyboardAvoidingView>    
    </ScrollView>
  )
}

export default SpecificJournalDetail

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