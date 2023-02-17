import { Dimensions, KeyboardAvoidingView, RefreshControl, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
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
const CreateJournal = ({navigation}) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [homework, setHomework] = useState('');


  
    
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const d = new Date();
  let day = d.getDate();
  let year = d.getFullYear();
  let month = monthNames[d.getMonth()];
  
  const CurrentDate = `${day}th ${month} ${year}` 


    
   

    const postThings = async()=>{
        await AsyncStorage.getItem('token').then((value) =>{
            if(value!==null){
              token = JSON.parse(value)
            }
          })
        await fetch(Apilink+`/auth/postmyjourney`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token,
            },
            body: JSON.stringify({
                "my_journey" :{
                    "date":CurrentDate,
                    "title":homework
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
        navigation.goBack();      
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
                Add Journal
        </Text>
        <View >
       
        <TextInput 
        multiline={true}
             mode='outlined'
             value={homework}
             style={{
                 marginHorizontal:22,
                 height:windowHeight/2,
                 backgroundColor:Colors.light.white,
                 marginVertical:10,
                 }} 
            outlineColor={'rgba(0,0,0,0.15)'}
            activeOutlineColor={'rgba(0,0,0,0.15)'}
            onChangeText={(text)=>setHomework(text)}
        />
        {homework.length>0? <TouchableOpacity>
        <Button style={{backgroundColor:'rgba(0,0,0,0.45)',width:windowWidth/4,margin:10,alignSelf:'center'}} textColor="white" onPress={()=>{postThings()}}>Add</Button>
        </TouchableOpacity>:<></>}
       
        </View>
        
    </ScrollView>
    </KeyboardAvoidingView>    
    </ScrollView>
  )
}

export default CreateJournal;

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.light.white,
        flex:1
    },
    cardcontainer:{
        justifyContent:'space-evenly',
        backgroundColor: '#fff',
        height:windowHeight/4,
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