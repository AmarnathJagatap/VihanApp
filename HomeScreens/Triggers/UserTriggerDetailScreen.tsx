import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const UserTriggerDetailScreen = ({route}) => {
    const {myTriggers,name} = route.params;
    console.log(myTriggers)
  return (
    <ScrollView>     
      <View>
          <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:17}}>Good</Text>
        {myTriggers?.mylogs?.length>0?
         myTriggers?.mylogs.map((item)=>{
          if(item.feel==="Good"&& item.delete === false){
           
            return(
              <TouchableOpacity onPress={()=>{}}>
                  <View style={{width:windowWidth-20,flexDirection:'row',justifyContent:'space-around',marginVertical:10}}>
                    <LinearGradient colors={['#FBBAA8','rgba(251, 239, 200, 0) @ 100%']} style={{width:30,height:30,borderRadius:30}}>              
                    </LinearGradient>
                    <View>
                    <Text style={{ fontSize: 15,color:"rgba(0, 0, 0, 0.80)",fontFamily:'Poppins-Regular'}}>{item.trigger}</Text>        
                    <Text style={{ fontSize: 12,color:"rgba(0, 0, 0, 0.80)",fontFamily:'Poppins-Regular'}}>Go often</Text>        
                    </View>
                    
                </View>
             </TouchableOpacity>                 

            )
          }
         }):<></>}                          
      </View>
      <View>
          <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:17}}>Bad</Text>
          {myTriggers?.mylogs?.length>0?
         myTriggers?.mylogs.map((item,index)=>{
          if(item.feel==="Bad"&& item.delete === false){
            return(
              <View style={{width:windowWidth-20,flexDirection:'row',justifyContent:'space-around',marginVertical:10}}>
                <LinearGradient colors={['#FBBAA8','rgba(251, 239, 200, 0) @ 100%']} style={{width:30,height:30,borderRadius:30}}>              
                </LinearGradient>
                <View>
                <Text style={{ fontSize: 15,color:"rgba(0, 0, 0, 0.80)",fontFamily:'Poppins-Regular'}}>{item.trigger}</Text>        
                <Text style={{ fontSize: 12,color:"rgba(0, 0, 0, 0.80)",fontFamily:'Poppins-Regular'}}>Go often</Text>        
                </View>
               
             </View>

            )
          }
         }):<></>}  
                              
    </View>
   
    
</ScrollView>
  )
}

export default UserTriggerDetailScreen

const styles = StyleSheet.create({})