import { ScrollView, StyleSheet, Text, View,Image, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../Context/AuthContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Programs = () => {
  const {userData} = useContext(AuthContext)
  return (
    <>
      <LinearGradient
        // Button Linear Gradient
        colors={['#6264AF','#6275CF','#6276EF','#6277FF','#6288EC','#6299EF']} style={styles.container}>
      <View style={styles.header}>
          <View style={styles.propicrow}>
          <Image source={require('../../assets/propic.jpg')} style={styles.profilePic} />
          <Text style={styles.name}>Hi {userData?.user_info?.username}</Text>
          </View>
          <View style={styles.icons}>
            
          </View>
      </View>
      <TouchableOpacity>
      <LinearGradient
        // Button Linear Gradient
        colors={['#FFFFFF','rgba(255, 255, 255, 8)','rgba(255, 255, 255, 5) @ 100%']} style={styles.button}>
                  <Text style={styles.buttonText}>Programs</Text>
      </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
    <ScrollView> 
        <View>
          <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:17}}>Depression Program</Text>   
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>   
             
          <ImageBackground borderRadius={30} source={require('../../assets/selfcare1.png')} style={{height:windowHeight/3.5,width:windowWidth/1.2}}>
            <View style={{borderRadius:40,flexDirection:'column',flex:1,justifyContent:'space-between'}}>
                <Text style={{marginHorizontal:30,marginVertical:10,fontSize:18,color:'#ffffff'}}>Mindful Audio</Text>
                <Text style={{marginHorizontal:30,marginVertical:10,fontSize:18,color:'#ffffff'}}>Day 1</Text>
            </View>
          </ImageBackground>
          <Image source={require('../../assets/selfcare2.png')} style={{borderRadius:30,height:windowHeight/4}}/>
          <Image source={require('../../assets/selfcare2.png')} style={{borderRadius:30,height:windowHeight/4}}/>
         
          </ScrollView>
        </View>

        <View>
          <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:17}}>Explore</Text>
          <ImageBackground borderRadius={30} source={require('../../assets/Explore.png')} style={{height:windowHeight/4,marginHorizontal:20,justifyContent:'space-evenly'}}>
            <View style={{marginVertical:20,flex:1,alignItems:'flex-start',marginHorizontal:20}}>
                <Text style={{fontSize:20,color:'#ffffff',}}>
                    Take this Program
                </Text>
                <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:20,color:'#ffffff',marginHorizontal:5}}>
                    with 
                </Text>
                <Text style={{fontSize:20,color:'#ff0000',}}>
                    Subscription
                </Text>
                </View>
            </View>    
            <View style={{marginBottom:30,marginHorizontal:20,borderColor:'#ffffff',borderWidth:2,width:windowWidth/3.4,height:windowHeight/18,borderRadius:20,alignItems:'center'}}>
                <Text style={{fontSize:14,color:'#ffffff'}}>Explore Now</Text>
            </View>       
          </ImageBackground>     
        </View>

       

    </ScrollView>
    </>
  )
}

export default Programs

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