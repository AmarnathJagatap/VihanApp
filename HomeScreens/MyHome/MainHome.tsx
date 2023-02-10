import { ScrollView, StyleSheet, Text, View,Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../Context/AuthContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MainHome = () => {
  const {setHomeScreenItem} = useContext(AuthContext)
  return (
    <ScrollView>
        <View>
          <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:17}}>Upcoming Events</Text>
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

        <View>
          <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:17}}>Past Sessions</Text>
          <View style={{flexDirection:'row'}}>
              <LinearGradient
                colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardImagecontainer}>
                    <Image source={require('../../assets/pastsession1.png')} style={{borderRadius:20,width:windowWidth/2.10,height:windowHeight/7}}/>
                    <TouchableOpacity onPress={()=>{setHomeScreenItem('TASK')}}>
                    <Text style={{ fontSize: 14, color:"#000", fontFamily:'Poppins-Regular',alignSelf:'center',marginVertical:5}}>My Task</Text>    
                    </TouchableOpacity> 
              </LinearGradient>   
              <LinearGradient
                colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardImagecontainer}>
                    <Image source={require('../../assets/pastsession2.png')} style={{borderRadius:20,width:windowWidth/2.10,height:windowHeight/7}}/>
                    <TouchableOpacity onPress={()=>{setHomeScreenItem('Reflect Back')}}>
                    <Text style={{ fontSize: 14, color:"#000", fontFamily:'Poppins-Regular',alignSelf:'center',marginVertical:5}}>Reflection Back</Text>    
                    </TouchableOpacity>                                
                                            
              </LinearGradient> 
          </View>  

          <TouchableOpacity>
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