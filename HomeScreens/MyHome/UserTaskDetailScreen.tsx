import { Dimensions, KeyboardAvoidingView, RefreshControl, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../Constants/Colors'
import { Avatar, Button, TextInput } from 'react-native-paper'
import { Apilink } from '../../Constants/Apilink';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient'

  
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
let token;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
const UserTaskDetailScreen = ({route,navigation}) => {
    const {sessionNotes,name} = route.params;
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);
  

    console.log(name)
    const [homework, setHomework] = useState('');

    const SessionNotes = {
      "title":homework,
      "notes": "",
      "status":"NotComplited"
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
              "session_notes": SessionNotes,
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

    const deleteHomework = async(item_to_be_removed)=>{
      let data_new = sessionNotes['notes']?.filter(function(item){
          return item.title!== item_to_be_removed.title
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
         borderRadius:10,
         margin:10}}
         nestedScrollEnabled = {true}>
        <Text style={{
            alignSelf:'center',
             fontFamily:'Poppins-Regular', 
             fontSize:15, 
             marginVertical:5
             }}>
                Add & View Tasks of Users
        </Text>
        <View >
        <TextInput 
             mode='outlined'
             style={{
                 marginHorizontal:22,
                 height:50,
                 backgroundColor:Colors.light.white,
                 marginVertical:10
                 }} 
            label="Add Task"
            outlineColor={'rgba(0,0,0,0.55)'}
            activeOutlineColor={'rgba(0,0,0,0.65)'}
            onChangeText={(text)=>setHomework(text)}
        />
        {homework.length>0? <TouchableOpacity>
        <Button style={{backgroundColor:'rgba(0,0,0,0.45)',width:windowWidth/4,margin:10,alignSelf:'center'}} textColor="white" onPress={()=>{addHomework()}}>Add</Button>
        </TouchableOpacity>:<></>}
       
        </View>
        {sessionNotes['notes'].length>0?
        sessionNotes['notes']?.map((item)=>(
            <LinearGradient
            colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardcontainer}>
              <View>
                    <Text style={{marginHorizontal:10,textAlign:"center",marginTop:5,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:13}}>{item.title}</Text>
                    <View style={{flexDirection:"row",justifyContent:"space-between",paddingVertical:5,paddingHorizontal:10}}>
                       <Text style={{fontFamily:'Poppins-Regular',fontSize:13,marginTop:6}}>Status: {item.status}</Text>
                       <TouchableOpacity onPress={()=>{deleteHomework(item)}} style={{backgroundColor:"#FF5C5C",padding:10,borderRadius:15}}>
                            <Text>Delete</Text>
                       </TouchableOpacity>                     
                    </View>
                    <Text style={{paddingHorizontal:10,textAlign:'justify',paddingVertical:5}}>Notes : {item.notes}</Text>
                </View>

          </LinearGradient>
        )):
        <LinearGradient
        colors={['rgba(300, 195, 238, 0.76) @ 8.68%','rgba(300, 195, 238, 0.76) @ 38.89%','rgba(300, 195, 238, 0.76) @ 99.99%','rgba(300, 195, 238, 0.76) @ 100%']} style={styles.cardcontainer}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:5}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',width:windowWidth/3}}>
                    <Text style={{marginHorizontal:10,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:13}}>Nothing To Show</Text>
                    </View>                
                </View>

          </LinearGradient>
        }
        
    </ScrollView>
    </KeyboardAvoidingView>    
    </ScrollView>
  )
}

export default UserTaskDetailScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.light.white,
        flex:1
    },
    cardcontainer:{
        justifyContent:'space-evenly',
        backgroundColor: '#fff',
        height:windowHeight/6,
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