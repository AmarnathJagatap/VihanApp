import { StyleSheet, Text, TouchableOpacity, View,Image, Dimensions } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Activities = () => {
  return (
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
    </View>

  )
}

export default Activities

const styles = StyleSheet.create({
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
})