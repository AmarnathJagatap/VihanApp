import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Platform, Button } from 'react-native';
import Slider from '@react-native-community/slider';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const MoodTracker = () => {
  const [value,setvalue] = useState(0);
  return (
    <ScrollView>
    <View>
      <Text style={{marginHorizontal:30,textAlign:'center',marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:17}}>How are you?</Text>               
    </View>

    <View>
      <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
      <Image source={require('../../assets/very-happy.png')} style={{width:value<1.5 && value>0?60:40,marginHorizontal:10,height:value<1.5 && value>0?60:40}}/>
      <Image source={require('../../assets/happy.png')} style={{width:value<4 && value>1.5?60:40,marginHorizontal:10,height:value<4 && value>1.5?60:40}}/>
      <Image source={require('../../assets/emoji.png')} style={{width:value<6 && value>4?60:40,marginHorizontal:10,height:value<6 && value>4?60:40}}/>
      <Image source={require('../../assets/sad.png')} style={{width:value<8 && value>6?60:40,marginHorizontal:10,height:value<8 && value>6?60:40}}/>
      <Image source={require('../../assets/angry.png')} style={{width:value<10 && value>8?60:40,marginHorizontal:10,height:value<10 && value>8?60:40}}/>
      </View>

      <Slider
        style={{width: windowWidth, height: 50}}
        onValueChange={(e)=>setvalue(e)}
        minimumValue={0}
        maximumValue={10}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        thumbTintColor="gray"
      />

    </View>

    <TouchableOpacity>
              <LinearGradient
                    colors={['rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)']} style={{width:windowWidth-30,height:windowHeight/20,borderRadius:10,alignItems:'center',justifyContent:'center',margin:15}}>
                      <Text style={{ fontSize: 12,color:"#ffffff",fontFamily:'Poppins-Regular'}}>Check History</Text>
              </LinearGradient>
          </TouchableOpacity> 
    
</ScrollView>
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

export default MoodTracker;