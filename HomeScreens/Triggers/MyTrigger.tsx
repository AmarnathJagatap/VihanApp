import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Platform, ToastAndroid } from 'react-native';
import { Entypo,FontAwesome } from '@expo/vector-icons'; 
import { Apilink } from '../../Constants/Apilink';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let token;
const MainComponent = () => {
  const [triggers,setTriggers] = useState({});
  const navigation = useNavigation();
  useEffect(()=>{
    getTriggers()
  },[])
  const getTriggers = async()=>{
    await AsyncStorage.getItem('token').then((value) =>{
        if(value!==null){
          token = JSON.parse(value)
        }
      })
    await fetch(Apilink+`/auth/getmylogs`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      })
    .then((response)=>(response.json()))
    .then((response)=>setTriggers(response?.my_logs)) 
} 

const upDateTrigger = async(item)=>{
  await AsyncStorage.getItem('token').then((value) =>{
      if(value!==null){
        token = JSON.parse(value)
      }
    })
  await fetch(Apilink+`/auth/updatemylogs`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      }, 
      body: JSON.stringify({
        "my_logs":{
          "feel": item.feel,
          "trigger": item.trigger,
          "delete": true
        }
      })
    })
  .then((response)=>(response.json()))
  getTriggers()
  ToastAndroid.showWithGravityAndOffset(
      "UpDated",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    ); 
} 


  return (
    <>
      <TouchableOpacity onPress={()=>navigation.navigate('AddTrigger')}>
        <LinearGradient
              colors={['rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)']} style={{width:windowWidth-30,height:windowHeight/20,borderRadius:10,alignItems:'center',justifyContent:'center',margin:15}}>
                <Text style={{ fontSize: 12,color:"#ffffff",fontFamily:'Poppins-Regular'}}>Add Trigger</Text>
        </LinearGradient>
    </TouchableOpacity>
    <ScrollView>     
      <View>
          <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:17}}>Good</Text>
        {triggers?.mylogs?.length>0?
         triggers?.mylogs.map((item)=>{
          if(item.feel==="Good"&& item.delete === false){
            return(
              <TouchableOpacity onPress={()=>{}}>
                  <View style={{width:windowWidth-20,flexDirection:'row',justifyContent:'space-around',marginVertical:10}}>
                    <LinearGradient colors={['#FBBAA8','rgba(251, 239, 200, 0) @ 100%']} style={{width:30,height:30,borderRadius:30}}>              
                    </LinearGradient>
                    <View>
                    <Text style={{ fontSize: 15,color:"rgba(0, 0, 0, 0.80)",fontFamily:'Poppins-Regular'}}>{item.trigger}</Text>        
                    <Text style={{ fontSize: 12,color:"rgba(0, 0, 0, 0.80)",fontFamily:'Poppins-Regular'}}>Go often</Text>        
                    </View>
                    <TouchableOpacity onPress={()=>{upDateTrigger(item)}} style={{backgroundColor:'#8AFF8A',width:70,padding:10,borderRadius:30}}>
                       <Text style={{textAlign:'center'}}>Delete</Text>
                    </TouchableOpacity>
                </View>
             </TouchableOpacity>                 

            )
          }
         }):<></>}                          
      </View>
      <View>
          <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:17}}>Bad</Text>
          {triggers?.mylogs?.length>0?
         triggers?.mylogs.map((item,index)=>{
          if(item.feel==="Bad"&& item.delete === false){
            return(
              <View style={{width:windowWidth-20,flexDirection:'row',justifyContent:'space-around',marginVertical:10}}>
                <LinearGradient colors={['#FBBAA8','rgba(251, 239, 200, 0) @ 100%']} style={{width:30,height:30,borderRadius:30}}>              
                </LinearGradient>
                <View>
                <Text style={{ fontSize: 15,color:"rgba(0, 0, 0, 0.80)",fontFamily:'Poppins-Regular'}}>{item.trigger}</Text>        
                <Text style={{ fontSize: 12,color:"rgba(0, 0, 0, 0.80)",fontFamily:'Poppins-Regular'}}>Go often</Text>        
                </View>
                <TouchableOpacity onPress={()=>{upDateTrigger(item)}} style={{backgroundColor:'#8AFF8A',width:70,padding:10,borderRadius:30}}>
                       <Text style={{textAlign:'center'}}>Delete</Text>
                    </TouchableOpacity>
             </View>

            )
          }
         }):<></>}  
                              
    </View>
    <TouchableOpacity onPress={()=>{navigation.navigate('Checkhistory')}}>
              <LinearGradient
                    colors={['rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)']} style={{width:windowWidth-30,height:windowHeight/20,borderRadius:10,alignItems:'center',justifyContent:'center',margin:15}}>
                      <Text style={{ fontSize: 12,color:"#ffffff",fontFamily:'Poppins-Regular'}}>Check History</Text>
              </LinearGradient>
      </TouchableOpacity>     
    
</ScrollView>
</>
  );
};

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
  calendarcontainer:{
    backgroundColor: '#D9D9D9',
    height:windowHeight/14,
    width:windowWidth/1.3,
    justifyContent:'center',
    padding:15,
    marginHorizontal:15,
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

export default MainComponent;