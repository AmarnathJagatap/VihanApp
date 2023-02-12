import { StyleSheet, Text, View,Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Button, Modal, TextInput } from 'react-native-paper';
import Colors from '../../Constants/Colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Apilink } from '../../Constants/Apilink';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let token;
const MyLogs = () => {
  const [mylogtitle,setmylogtitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [logData, setLogData] = useState({});

  console.log(logData)

  useEffect(()=>{
    getMyLogs();
  },[])

  const getMyLogs = async () => {
   await AsyncStorage.getItem('token').then((value) =>{
     if(value!==null){
       token = JSON.parse(value)
     }
   })
  console.log(token)
   await fetch(Apilink + '/auth/getmylogs', {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json',
           'Authorization': token
       },
   })
   .then(response => response.json())
   .then(data => setLogData(data))
}

  const handleSubmit = async () => {
    const date_json = selectedDate.getTime()
    console.log(date_json)
   await AsyncStorage.getItem('token').then((value) =>{
     if(value!==null){
       token = JSON.parse(value)
     }
   })

   await fetch(Apilink + '/auth/postmylogs', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
           'Authorization': token
       },
       body: JSON.stringify({
        my_logs: [{
          title:mylogtitle,
          date:date_json
      }]
       })
   })
   .then((res)=>{console.log(res)})
   .then()
 
}
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };
  return (
    <View>
    <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:17}}>Upcoming Events</Text>
    <TextInput 
             mode='outlined'
             style={{
                 marginHorizontal:22,
                 height:50,
                 backgroundColor:Colors.light.white,
                 marginVertical:10
                 }} 
            label="Add Logs"
            outlineColor={'rgba(0,0,0,0.55)'}
            activeOutlineColor={'rgba(0,0,0,0.65)'}
            onChangeText={(text)=>setmylogtitle(text)}
    />
    {mylogtitle.length>0?  <><Button style={{backgroundColor:Colors.light.tabIconSelected,alignSelf:'center',width:'60%'}} color={Colors.light.white} onPress={showDatePicker} >Select Date and Time</Button>     

<DateTimePickerModal
  isVisible={isDatePickerVisible}
  mode="datetime"
  onConfirm={handleConfirm}
  onCancel={hideDatePicker}
/>
<Button style={{backgroundColor:Colors.light.tabIconSelected, margin:10,alignSelf:'center',width:'50%'}} color={Colors.light.white} onPress={()=>{handleSubmit()}}>Submit</Button></>:<></>}
   
    <LinearGradient
      colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardcontainer}>
          <Image source={require('../../assets/cardImage.png')} style={{borderRadius:30,width:windowWidth-20,height:windowHeight/5.8}}/>
          <View style={styles.meetingrow}>
              <View style={styles.propicrow}>
                  <View>
                    <Text style={styles.meetingrowname}>Thought Checking</Text>
                    <Text style={styles.meetingrowtime}>30th Friday</Text>
                  </View>
              </View>
              <View>
                <TouchableOpacity>
                <LinearGradient
                      colors={['rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)']} style={{width:windowWidth/3,height:windowHeight/20,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{ fontSize: 12,color:"#ffffff",fontFamily:'Poppins-Regular'}}>30th Friday</Text>
                </LinearGradient>
                </TouchableOpacity>
                <Text style={{ fontSize: 11,color:"#000",fontFamily:'Poppins-Regular',textAlign:'center',marginTop:5}}>Time 6:30PM</Text>
              </View>
               </View>
      </LinearGradient>

    <LinearGradient
      colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardcontainer}>
          <Image source={require('../../assets/cardImage.png')} style={{borderRadius:30,width:windowWidth-20,height:windowHeight/5.8}}/>
          <View style={styles.meetingrow}>
              <View style={styles.propicrow}>
                  <View>
                    <Text style={styles.meetingrowname}>Rumination Alert</Text>
                    <Text style={styles.meetingrowtime}>30th Friday</Text>
                  </View>
              </View>
              <View>
                <TouchableOpacity>
                <LinearGradient
                      colors={['rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)']} style={{width:windowWidth/3,height:windowHeight/20,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{ fontSize: 12,color:"#ffffff",fontFamily:'Poppins-Regular'}}>30th Friday</Text>
                </LinearGradient>
                </TouchableOpacity>
                <Text style={{ fontSize: 11,color:"#000",fontFamily:'Poppins-Regular',textAlign:'center',marginTop:5}}>Time 6:30PM</Text>
              </View>
               </View>
      </LinearGradient>
      </View>
  )
}

export default MyLogs

const styles = StyleSheet.create({
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
  propicrow:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    width:windowWidth/2,
  },
   cardcontainer:{
    marginTop:10,
    backgroundColor: '#fff',
    height:windowHeight/3.8,
    marginHorizontal:10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },
})