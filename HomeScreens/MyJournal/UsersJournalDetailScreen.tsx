import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import {FontAwesome} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const UsersJournalDetailScreen = ({route}) => {
    const navigation = useNavigation();
    const {myJourney,name} = route.params; 
  return (
    <View>
      {myJourney?.my_journey.length>0?
      myJourney?.my_journey.map((item,index)=>(
         <TouchableOpacity  style={{margin:10,backgroundColor:"#fff",padding:10,elevation:10,borderRadius:20}}> 
            <Text style={{ fontSize: 15,color:"rgba(0, 0, 0, 0.90)",fontFamily:'Poppins-Bold',marginVertical:5}}>{item.date}</Text>   
                <Text style={{ fontSize: 15,color:"rgba(0, 0, 0, 0.90)",fontFamily:'Poppins-Regular',marginVertical:5}}>{item.title}</Text>             
         </TouchableOpacity>                
      )):
      <TouchableOpacity  style={{margin:10,backgroundColor:"#FF5C5C",padding:10,elevation:10,borderRadius:20}}> 
            <Text style={{ fontSize: 15,color:"rgba(0, 0, 0, 0.90)",fontFamily:'Poppins-Bold',marginVertical:5}}>Nothing to Show</Text>   
         </TouchableOpacity> }     
      </View>
      
  )
}

export default UsersJournalDetailScreen

const styles = StyleSheet.create({})