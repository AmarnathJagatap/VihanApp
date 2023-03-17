import { ScrollView, StyleSheet, Text, View,Image, TouchableOpacity, Dimensions, Linking, Alert } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Apilink } from '../../Constants/Apilink';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let token
const MainHome = () => {
  const {userData} = useContext(AuthContext)
  const navigation = useNavigation();

  const [docData, setDocData] = useState(null);
  const getDocData = async()=>{
      await AsyncStorage.getItem('token').then((value) =>{
          if(value!==null){
            token = JSON.parse(value)
          }
        })
      await fetch(Apilink+`/auth/getdocdata`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          }
        })
      .then((response)=>response.json())
      .then((response)=>setDocData(response))

  }
  useEffect(()=>{
      getDocData();
  },[])

  const supportedURL = docData?.doctor_info?.calendly_link;
  
  const OpenURLButton = ({ url }) => {
    console.log(url)
      const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          await Linking.openURL(url);
      } else {
          Alert.alert(`Don't know how to open this URL: ${url}`);
      }
      }, [url]);
  
      return  (
      <TouchableOpacity onPress={()=>{handlePress()}}>
          <LinearGradient
            colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardcontainer}>
                <Image source={require('../../assets/cardImage.png')} style={{borderRadius:30,width:windowWidth-20,height:windowHeight/5.8}}/>
                <View style={styles.meetingrow}>
                    <View style={styles.propicrow}>
                        <Image source={require('../../assets/propic2.jpg')} style={styles.profilePicmeet} />
                        <View>
                          <Text style={styles.meetingrowname}>Merlin</Text>
                          <Text style={styles.meetingrowtime}>30th Friday</Text>
                        </View>
                    </View>
                    <View>
                      <LinearGradient
                            colors={['rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)']} style={{width:windowWidth/3,height:windowHeight/20,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                              <Text style={{ fontSize: 12,color:"#ffffff",fontFamily:'Poppins-Regular'}}>30th Friday</Text>
                      </LinearGradient>
                      <Text style={{ fontSize: 11,color:"#000",fontFamily:'Poppins-Regular',textAlign:'center',marginTop:5}}>Time 6:30PM</Text>
                    </View>
          </View>
        </LinearGradient>  
    </TouchableOpacity>
    )
  };


  return (
    <ScrollView>
        <View>
          <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:17}}>Upcoming Events</Text>

          <OpenURLButton url={supportedURL}/>
    
        </View>

       

        <View>
          <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:17}}>Past Sessions</Text>
          {userData?.user_info?.role === "doctor"?
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={()=>{navigation.navigate('UsersTasks')}}>
                <LinearGradient
                  colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardImagecontainer}>
                      <Image source={require('../../assets/pastsession1.png')} style={{borderRadius:20,width:windowWidth/2.10,height:windowHeight/7}}/>
                      
                      <Text style={{ fontSize: 14, color:"#000", fontFamily:'Poppins-Regular',alignSelf:'center',marginVertical:5}}>Users Task</Text>    
                </LinearGradient>  
                </TouchableOpacity> 
                <TouchableOpacity onPress={()=>{navigation.navigate('UsersReflectBack')}}>

                <LinearGradient
                  colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardImagecontainer}>
                      <Image source={require('../../assets/pastsession2.png')} style={{borderRadius:20,width:windowWidth/2.10,height:windowHeight/7}}/>
                      <Text style={{ fontSize: 14, color:"#000", fontFamily:'Poppins-Regular',alignSelf:'center',marginVertical:5}}>Users Reflection Back</Text>    
                                              
                </LinearGradient> 
                </TouchableOpacity>                                

            </View> : 
              <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity onPress={()=>{navigation.navigate('MyTask')}}>

              <LinearGradient
                colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardImagecontainer}>
                    <Image source={require('../../assets/pastsession1.png')} style={{borderRadius:20,width:windowWidth/2.10,height:windowHeight/7}}/>
                    <Text style={{ fontSize: 14, color:"#000", fontFamily:'Poppins-Regular',alignSelf:'center',marginVertical:5}}>My Task</Text>    
              </LinearGradient>   
              </TouchableOpacity> 
              <TouchableOpacity onPress={()=>{navigation.navigate('ReflectBack')}}>

              <LinearGradient
                colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardImagecontainer}>
                    <Image source={require('../../assets/pastsession2.png')} style={{borderRadius:20,width:windowWidth/2.10,height:windowHeight/7}}/>
                    <Text style={{ fontSize: 14, color:"#000", fontFamily:'Poppins-Regular',alignSelf:'center',marginVertical:5}}>Reflection Back</Text>    
                                            
              </LinearGradient> 
              </TouchableOpacity>                                

              </View> 
           }
         

          <TouchableOpacity onPress={()=>{navigation.navigate('Quiz')}}>
              <LinearGradient
                    colors={['rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)']} style={{width:windowWidth-30,height:windowHeight/20,borderRadius:10,alignItems:'center',justifyContent:'center',margin:15}}>
                      <Text style={{ fontSize: 12,color:"#ffffff",fontFamily:'Poppins-Regular'}}>Questionaries</Text>
              </LinearGradient>
          </TouchableOpacity>           
        </View>
    </ScrollView>
  )
}

export default MainHome

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
    cardcontainer:{
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