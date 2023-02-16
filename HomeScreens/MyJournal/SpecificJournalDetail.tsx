import { Dimensions, KeyboardAvoidingView, RefreshControl, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../Constants/Colors'
import { Avatar, Button, TextInput } from 'react-native-paper'
import { Apilink } from '../../Constants/Apilink';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient'
import {FontAwesome} from '@expo/vector-icons'

  
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
let token;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
const SpecificJournalDetail = ({route,navigation}) => {
    const {myJournal,name} = route.params;

 
    
  return (
   <ScrollView 
   style={styles.container}
    nestedScrollEnabled = {true}
    >
    <KeyboardAvoidingView>
    <ScrollView style={{
        flex:1,
         borderRadius:10,
         margin:10}}
         nestedScrollEnabled = {true}>
        <Text style={{
            alignSelf:'center',
             fontFamily:'Poppins-Regular', 
             fontSize:15, 
             marginVertical:5
             }}>
                Add Journal
        </Text>
        <View >
        
       
        </View>
        {myJournal['title']?
        myJournal['title']?.map((item,index)=>(
            <LinearGradient
            colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardcontainer}>
                <View style={{flexDirection:"row",justifyContent:'space-around'}}>
                <Text style={{marginHorizontal:10,padding:5,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:13}}>{item}</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate('EditJournalNote',{name:item,myJournal:myJournal})}} style={{marginHorizontal:10,padding:5,marginTop:10,marginBottom:5}}>
                  <FontAwesome  name="edit" size={20}/>  

                </TouchableOpacity>   
               
                </View>                

          </LinearGradient>
        )):
        <LinearGradient
            colors={['rgba(300, 195, 238, 0.76) @ 8.68%','rgba(300, 195, 238, 0.76) @ 38.89%','rgba(300, 195, 238, 0.76) @ 99.99%','rgba(300, 195, 238, 0.76) @ 100%']} style={styles.cardcontainer}>
              <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:5}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',width:windowWidth/3}}>
                    <Text style={{marginHorizontal:10,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:13}}>Nothing To Show</Text>
                    </View>                
                </View>

          </LinearGradient>
       }
        
    </ScrollView>
    </KeyboardAvoidingView>    
    </ScrollView>
  )
}

export default SpecificJournalDetail

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.light.white,
        flex:1
    },
    cardcontainer:{
        justifyContent:'space-evenly',
        backgroundColor: '#fff',
        height:windowHeight/12,
        marginVertical:5,
        marginHorizontal:22,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 10,
      }
})