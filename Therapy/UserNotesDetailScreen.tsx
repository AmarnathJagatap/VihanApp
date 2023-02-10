import { Dimensions, KeyboardAvoidingView, RefreshControl, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../constants/Colors'
import { Button, TextInput } from 'react-native-paper'
import { Apilink } from '../../constants/Apilink';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

  
const windowHeight = Dimensions.get('window').height;
let token;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
const UserDetailScreen = ({route,navigation}) => {
    const {sessionNotes,name} = route.params;
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);
  

    console.log(name)
    const [homework, setHomework] = useState('');
    const [notes,setNotes] = useState('');
    const addNotes = async()=>{
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
              "things_to_remember": notes
            })
          })
        .then((response)=>{response.json()})
        .then((response)=>console.log(response)) 
        ToastAndroid.showWithGravityAndOffset(
            "Notes added Go Back and Refresh",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );       
    }
    const addHomework = async()=>{
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
              "session_notes": homework,
              "things_to_remember": ""
            })
          })
        .then((response)=>{response.json()})
        .then((response)=>console.log(response)) 
        ToastAndroid.showWithGravityAndOffset(
            "Homwork add Go Back and Refresh",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );       
    } 
    const deleteNotes = async(item_to_be_removed)=>{
        let data_new = sessionNotes['notes']?.filter(function(item){
            return item!== item_to_be_removed
        })
        await AsyncStorage.getItem('token').then((value) =>{
            if(value!==null){
              token = JSON.parse(value)
            }
          })
        await fetch(Apilink+`/auth/postnotes`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':token,
            },
            body: JSON.stringify({
                "username": name,
                "session_notes": "",
                "things_to_remember": data_new
              })
        })
        ToastAndroid.showWithGravityAndOffset(
            "Notes delted Back and Refresh",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );

    }
    const deleteHomework = async(item_to_be_removed)=>{
        let data_new = sessionNotes['notes']?.filter(function(item){
            return item!== item_to_be_removed
        })
        await AsyncStorage.getItem('token').then((value) =>{
            if(value!==null){
              token = JSON.parse(value)
            }
          })
        await fetch(Apilink+`/auth/postnotes`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':token,
            },
            body: JSON.stringify({
                "username": name,
                "session_notes": data_new,
                "things_to_remember": ""
              })
        })
        ToastAndroid.showWithGravityAndOffset(
            "Homwork delted Back and Refresh",
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
        <TextInput 
             mode='outlined'
             style={{
                marginHorizontal:10,
                 height:50,
                 backgroundColor:Colors.light.white,
                 }} 
            label="Add Homework"
            right={<TextInput.Icon icon="plus-box"  onPress={()=>{addHomework()}}/>}
            outlineColor={Colors.light.tabIconSelected}
            activeOutlineColor={Colors.light.tabIconSelected}
            onChangeText={(text)=>setHomework(text)}
        />
        {sessionNotes['notes'].length>0?
        sessionNotes['notes']?.map((item,index)=>(
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
            <TouchableOpacity onPress={()=>{deleteHomework(item)}}>
                    <Icon name="delete" size={24} color={Colors.light.white} />
            </TouchableOpacity>
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
        <TextInput 
             mode='outlined'
             style={{
                marginHorizontal:10,
                 height:50,
                 backgroundColor:Colors.light.white
                 }} 
            label="Add Things"
            onChangeText={(text)=>setNotes(text)}
            right={<TextInput.Icon icon="plus-box"  onPress={()=>{addNotes()}}/>}
            outlineColor={Colors.light.tabIconSelected}
            activeOutlineColor={Colors.light.tabIconSelected}
        />
         {sessionNotes['things_to_remember'].length>0?
        sessionNotes['things_to_remember'].map((item,index)=>(
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
            <Icon name="delete" onPress={()=>{deleteNotes(item)}} size={24} color={Colors.light.white}/>
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

export default UserDetailScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.light.background,
        flex:1
    }
})