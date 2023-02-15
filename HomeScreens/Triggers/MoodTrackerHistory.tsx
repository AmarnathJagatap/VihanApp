import { Dimensions, StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Apilink } from '../../Constants/Apilink';

let token;
let value =0;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MoodTrackerHistory = () => {
    const [mood, setMood] = useState();
    useEffect(()=>{
        getmoodtracker();
      },[])
         
      const getmoodtracker = async()=>{
        await AsyncStorage.getItem('token').then((value) =>{
            if(value!==null){
              token = JSON.parse(value)
            }
          })
        await fetch(Apilink+`/auth/getmoodtracker`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token,
            },
          })
        .then((response)=>(response.json()))
        .then((response)=>setMood(response?.mood_tracker)) 
    } 

        mood?.mood_tracker.map((item)=>{
            if(item.mood.length>1){
                const sum = item.mood.reduce((partialSum, a) => partialSum + a, 0);
                item.mood = sum/item.mood.length
                
            }  
            console.log(item)         
        })

        

  return (
    <View>
      {mood?.mood_tracker.map((item)=>(
        <View style={{flexDirection:'row',height:windowHeight/8,justifyContent:'space-around',backgroundColor:"#ffffff",margin:10,alignItems:'center',borderRadius:20,elevation:10}}>
            <Text>{item.date}</Text>
            {
                item.mood<=2?<Image source={require('../../assets/very-happy.png')} style={{width:value<2 && value>0?60:40,marginHorizontal:10,height:value<1.5 && value>0?60:40}}/>
                :<></>
            }
            {
                item.mood>2 && item.mood<=4?      <Image source={require('../../assets/happy.png')} style={{width:value<4 && value>2.2?60:40,marginHorizontal:10,height:value<4 && value>1.5?60:40}}/>
                :<></>
            }
            {
                item.mood>4 && item.mood<=6?      <Image source={require('../../assets/emoji.png')} style={{width:value<6 && value>4?60:40,marginHorizontal:10,height:value<6 && value>4?60:40}}/>
                :<></>
            }
            {
                item.mood>6 && item.mood<=8?      <Image source={require('../../assets/sad.png')} style={{width:value<8 && value>6?60:40,marginHorizontal:10,height:value<8 && value>6?60:40}}/>
                :<></>
            }
            {
                item.mood>8 && item.mood<=10?      <Image source={require('../../assets/angry.png')} style={{width:value<10 && value>8?60:40,marginHorizontal:10,height:value<10 && value>8?60:40}}/>
                :<></>
            }
        </View>
      ))}
    </View>
  )
}

export default MoodTrackerHistory

const styles = StyleSheet.create({})