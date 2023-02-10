import { StyleSheet, Text, View,Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MyLogs = () => {
  return (
    <View>
    <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:17}}>Upcoming Events</Text>
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