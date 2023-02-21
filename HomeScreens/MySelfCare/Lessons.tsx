import { ScrollView, StyleSheet, Text, View,Image, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../Context/AuthContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Lessons = () => {
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
    <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontSize:17}}>Introduction</Text>
    <View style={{flexDirection:'row'}}>
        <LinearGradient
          colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardImagecontainer}>
              <Image source={require('../../assets/activities2.png')} style={{borderRadius:20,width:windowWidth/2.10,height:windowHeight/7}}/>
              <TouchableOpacity onPress={()=>{}}>
              <Text style={{ fontSize: 14, color:"#000",alignSelf:'center',marginVertical:5}}>What is CBT</Text>    
              </TouchableOpacity> 
        </LinearGradient>   
        <LinearGradient
          colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardImagecontainer}>
              <Image source={require('../../assets/activities1.png')} style={{borderRadius:20,width:windowWidth/2.10,height:windowHeight/7}}/>
              <TouchableOpacity onPress={()=>{}}>
              <Text style={{ fontSize: 14, color:"#000",alignSelf:'center',marginVertical:5}}>What is it</Text>    
              </TouchableOpacity>                                
                                      
        </LinearGradient> 
    </View>  
    <View>
    <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontSize:17}}>Congnitive Disortion</Text>
    <View style={{flexDirection:'row'}}>
        <LinearGradient
          colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardImagecontainer}>
              <Image source={require('../../assets/activities3.png')} style={{borderRadius:20,width:windowWidth/2.10,height:windowHeight/7}}/>
              <TouchableOpacity onPress={()=>{}}>
              <Text style={{ fontSize: 14, color:"#000",alignSelf:'center',marginVertical:5}}>What is it?</Text>    
              </TouchableOpacity> 
        </LinearGradient>   
        <LinearGradient
          colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardImagecontainer}>
              <Image source={require('../../assets/activities4.png')} style={{borderRadius:20,width:windowWidth/2.10,height:windowHeight/7}}/>
              <TouchableOpacity onPress={()=>{}}>
              <Text style={{ fontSize: 14, color:"#000",alignSelf:'center',marginVertical:5}}>Types</Text>    
              </TouchableOpacity>                                
                                      
        </LinearGradient> 
    </View>  
    </View>
    <View>
    <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontSize:17}}>Thought Tools</Text>
    <View style={{flexDirection:'row'}}>
        <LinearGradient
          colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardImagecontainer}>
              <Image source={require('../../assets/ThoughtTools.png')} style={{borderRadius:20,width:windowWidth/2.10,height:windowHeight/7}}/>
              <TouchableOpacity onPress={()=>{}}>
              <Text style={{ fontSize: 14, paddingBottom:10, color:"#000",alignSelf:'center',textAlign:'center',marginVertical:5}}>Challenge Automatic Thought</Text>    
              </TouchableOpacity> 
        </LinearGradient>   
        <LinearGradient
          colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardImagecontainer}>
              <Image source={require('../../assets/prediction.png')} style={{borderRadius:20,width:windowWidth/2.10,height:windowHeight/7}}/>
              <TouchableOpacity onPress={()=>{}}>
              <Text style={{ fontSize: 14, color:"#000",alignSelf:'center',marginVertical:5}}>Prediction</Text>    
              </TouchableOpacity>                                
                                      
        </LinearGradient> 
    </View>  
    </View>
    <View>
    <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontSize:17}}>Goals, Values and Actions</Text>
    <View style={{flexDirection:'row'}}>
        <LinearGradient
          colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardImagecontainer}>
              <Image source={require('../../assets/GoalSetting.png')} style={{borderRadius:20,width:windowWidth/2.10,height:windowHeight/7}}/>
              <TouchableOpacity onPress={()=>{}}>
              <Text style={{ fontSize: 14, color:"#000",alignSelf:'center',textAlign:'center',marginVertical:5}}>Goal Setting</Text>    
              </TouchableOpacity> 
        </LinearGradient>   
        <LinearGradient
          colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardImagecontainer}>
              <Image source={require('../../assets/smartgoal.jpg')} style={{borderRadius:20,width:windowWidth/2.10,height:windowHeight/7}}/>
              <TouchableOpacity onPress={()=>{}}>
              <Text style={{ fontSize: 14, color:"#000",alignSelf:'center',marginVertical:5}}>Smart Goal Building</Text>    
              </TouchableOpacity>                                
                                      
        </LinearGradient> 
    </View>  
    <View style={{flexDirection:'row',marginTop:20}}>
        <LinearGradient
          colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardImagecontainer}>
              <Image source={require('../../assets/assesment.jpg')} style={{borderRadius:20,width:windowWidth/2.10,height:windowHeight/7}}/>
              <TouchableOpacity onPress={()=>{}}>
              <Text style={{ fontSize: 14, color:"#000",alignSelf:'center',textAlign:'center',marginVertical:5}}>Value Assesment</Text>    
              </TouchableOpacity> 
        </LinearGradient>   
       
    </View>  
    
    </View>

    <View>
    <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontSize:17}}>Mindfullness Tools</Text>
    <View style={{flexDirection:'row'}}>
        <LinearGradient
          colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardImagecontainer}>
              <Image source={require('../../assets/gratitude.png')} style={{borderRadius:20,width:windowWidth/2.10,height:windowHeight/7}}/>
              <TouchableOpacity onPress={()=>{}}>
              <Text style={{ fontSize: 14, color:"#000",alignSelf:'center',textAlign:'center',marginVertical:5}}>Gratitude Check In</Text>    
              </TouchableOpacity> 
        </LinearGradient>   
        <LinearGradient
          colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardImagecontainer}>
              <Image source={require('../../assets/reflection.jpg')} style={{borderRadius:20,width:windowWidth/2.10,height:windowHeight/7}}/>
              <TouchableOpacity onPress={()=>{}}>
              <Text style={{ fontSize: 14, color:"#000",alignSelf:'center',marginVertical:5}}>Reflection</Text>    
              </TouchableOpacity>                                
                                      
        </LinearGradient> 
    </View>  
    <View style={{flexDirection:'row',marginTop:20}}>
        <LinearGradient
          colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardImagecontainer}>
              <Image source={require('../../assets/breathing.png')} style={{borderRadius:20,width:windowWidth/2.10,height:windowHeight/7}}/>
              <TouchableOpacity onPress={()=>{}}>
              <Text style={{ fontSize: 14, color:"#000",alignSelf:'center',textAlign:'center',marginVertical:5}}>Breathing Excercise</Text>    
              </TouchableOpacity> 
        </LinearGradient>   
       
    </View>  
    
    </View>
    </View>
    </ScrollView>


    </>
  )
}

export default Lessons

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