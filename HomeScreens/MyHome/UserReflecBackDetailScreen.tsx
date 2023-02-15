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
const UserReflecBackDetailScreen = ({route,navigation}) => {
    const {sessionNotes,name} = route.params;
    const [refreshing, setRefreshing] = React.useState(false);
    const [things, setThings] = useState();
    const [homework, setHomework] = useState('');


    useEffect(()=>{
      setThings(sessionNotes["things_to_remember"])
    },[])

    
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


  const CheckDate = things?.filter(object => object.date===CurrentDate)


    const decisionFunction = () =>{
      if(CheckDate?.length>0){
        CheckDate[0]?.title.push(homework)
        updateThings();
      }else{
        postThings();
      }
    }

    const updateThings = async()=>{
      await AsyncStorage.getItem('token').then((value) =>{
          if(value!==null){
            token = JSON.parse(value)
          }
        })
      await fetch(Apilink+`/auth/updatenotesonly`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
          body: JSON.stringify({
            "username": name,
            "session_notes": "",
            "things_to_remember": {
              "title": CheckDate[0]?.title,
              "date": CurrentDate,
              "notes":""
            }
          })
        })
      .then((response)=>{response.json()})
      .then((response)=>console.log(response)) 
      setHomework('')
      ToastAndroid.showWithGravityAndOffset(
          "Relfect Back is added Go Back and Refresh",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );       
  } 

    
   

    const postThings = async()=>{
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
                Add & View Reflect Back of Users
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
            label="Add  Back"
            outlineColor={'rgba(0,0,0,0.55)'}
            activeOutlineColor={'rgba(0,0,0,0.65)'}
            onChangeText={(text)=>setHomework(text)}
        />
        {homework.length>0? <TouchableOpacity>
        <Button style={{backgroundColor:'rgba(0,0,0,0.45)',width:windowWidth/4,margin:10,alignSelf:'center'}} textColor="white" onPress={()=>{decisionFunction()}}>Add</Button>
        </TouchableOpacity>:<></>}
       
        </View>
        {sessionNotes['things_to_remember'].length>0?
        sessionNotes['things_to_remember']?.map((item)=>(
            <LinearGradient
            colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardcontainer}>
                <ScrollView style={{}}>
                <Text style={{marginHorizontal:10,padding:5,marginTop:10,marginBottom:5,fontFamily:'Poppins-Bold',fontSize:13}}>{item.date}</Text>
                
                {item.title.map((item)=>(
                                  <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:13}}>{item}</Text>
                ))}
                </ScrollView>                

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

export default UserReflecBackDetailScreen

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