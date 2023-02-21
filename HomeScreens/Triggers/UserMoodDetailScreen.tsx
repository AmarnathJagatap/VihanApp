import { StyleSheet, Text, View,Image, Dimensions } from 'react-native'
import React from 'react'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let value=0;
const UserMoodDetailScreen = ({route}) => {
    const {moodTracker,name} = route.params;

    function getMaxRepeatedNumber(arr) {
        let numCount = {};
        let maxNum = null;
        let maxCount = 0;
        
        for (let i = 0; i < arr.length; i++) {
          let num = arr[i];
          numCount[num] = (numCount[num] || 0) + 1;
          if (numCount[num] > maxCount) {
            maxNum = num;
            maxCount = numCount[num];
          }
        }
        
        return maxNum;
      }

      moodTracker?.mood_tracker.map((item)=>{
        if(item.mood.length>1){
            const max = getMaxRepeatedNumber(item.mood)
            item.mood = max                
        }  
        console.log(item)         
    })
  return (
    <View>
          {moodTracker?.mood_tracker.map((item)=>(
        <View style={{flexDirection:'row',height:windowHeight/8,justifyContent:'space-around',backgroundColor:"#ffffff",margin:10,alignItems:'center',borderRadius:20,elevation:10}}>
            <Text>{item.date}</Text>
            {
                item.mood==0?<Image source={require('../../assets/very-happy.png')} style={{width:value<2 && value>0?60:40,marginHorizontal:10,height:value<1.5 && value>0?60:40}}/>
                :<></>
            }
            {
                item.mood==1?      <Image source={require('../../assets/happy.png')} style={{width:value<4 && value>2.2?60:40,marginHorizontal:10,height:value<4 && value>1.5?60:40}}/>
                :<></>
            }
            {
                item.mood==2?      <Image source={require('../../assets/emoji.png')} style={{width:value<6 && value>4?60:40,marginHorizontal:10,height:value<6 && value>4?60:40}}/>
                :<></>
            }
            {
                item.mood==3?      <Image source={require('../../assets/sad.png')} style={{width:value<8 && value>6?60:40,marginHorizontal:10,height:value<8 && value>6?60:40}}/>
                :<></>
            }
            {
                item.mood==4?      <Image source={require('../../assets/angry.png')} style={{width:value<10 && value>8?60:40,marginHorizontal:10,height:value<10 && value>8?60:40}}/>
                :<></>
            }
        </View>
      ))}
    </View>
  )
}

export default UserMoodDetailScreen

const styles = StyleSheet.create({})