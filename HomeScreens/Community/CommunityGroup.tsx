import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Platform, Button } from 'react-native';
import { Entypo,FontAwesome } from '@expo/vector-icons'; 

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const CommunityGroup = () => {
  return (
    <ScrollView>

    <View>
      <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:17}}>asda</Text>
      <View style={{width:windowWidth-20,flexDirection:'row',justifyContent:'space-evenly',marginVertical:10}}>
        <LinearGradient colors={['#FBBAA8','rgba(251, 239, 200, 0) @ 100%']} style={{width:30,height:30,borderRadius:30,marginHorizontal:20}}>              
        </LinearGradient>
        <View>
        <Text style={{ fontSize: 15,color:"rgba(0, 0, 0, 0.90)",fontFamily:'Poppins-Regular',marginVertical:1}}>Tackle Anxity</Text>        
        <Text style={{ fontSize: 12,color:"rgba(0, 0, 0, 0.90)",fontFamily:'Poppins-Regular',marginVertical:1}}>48 Members</Text>        
        </View>
                          
        
      </View> 
      <View style={{width:windowWidth-20,flexDirection:'row',justifyContent:'space-evenly',marginVertical:10}}>
        <LinearGradient colors={['#FBBAA8','rgba(251, 239, 200, 0) @ 100%']} style={{width:30,height:30,borderRadius:30,marginHorizontal:20}}>              
        </LinearGradient>
        <View>
        <Text style={{ fontSize: 15,color:"rgba(0, 0, 0, 0.90)",fontFamily:'Poppins-Regular',marginVertical:1}}>Work Stress</Text>        
        <Text style={{ fontSize: 12,color:"rgba(0, 0, 0, 0.90)",fontFamily:'Poppins-Regular',marginVertical:1}}>20 Members</Text>        
        </View>                          
        
      </View>      
      <View style={{width:windowWidth-20,flexDirection:'row',justifyContent:'space-evenly',marginVertical:10}}>
        <LinearGradient colors={['#FBBAA8','rgba(251, 239, 200, 0) @ 100%']} style={{width:30,height:30,borderRadius:30,marginLeft:17}}>              
        </LinearGradient>
        <View style={{marginLeft:10}}>
        <Text style={{ fontSize: 15,color:"rgba(0, 0, 0, 0.90)",fontFamily:'Poppins-Regular',marginVertical:1}}>Exam Tensions</Text>        
        <Text style={{ fontSize: 12,color:"rgba(0, 0, 0, 0.90)",fontFamily:'Poppins-Regular',marginVertical:1}}>10 Members</Text>        
        </View>                         
        
      </View>      
      <View style={{width:windowWidth-20,flexDirection:'row',justifyContent:'space-evenly',marginVertical:10}}>
        <LinearGradient colors={['#FBBAA8','rgba(251, 239, 200, 0) @ 100%']} style={{width:30,height:30,borderRadius:30,marginLeft:30}}>              
        </LinearGradient>
        <View style={{marginLeft:10}}>
        <Text style={{ fontSize: 15,color:"rgba(0, 0, 0, 0.90)",fontFamily:'Poppins-Regular',marginVertical:1}}>Loss of Loved One</Text>        
        <Text style={{ fontSize: 12,color:"rgba(0, 0, 0, 0.90)",fontFamily:'Poppins-Regular',marginVertical:1}}>10 Members</Text>        
        </View>                        
        
      </View>                          
    </View>
    
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

export default CommunityGroup;