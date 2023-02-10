import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import  Colors  from '../Constants/Colors';
import { Avatar, Button, Divider, List } from 'react-native-paper';

const GroupDetails = ({route, navigation}) => {
    const {group_details} = route.params;
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    let session_details = group_details.session_details.map((session) => {
        const d = new Date()
        if (session.exercise_date_time > d.getTime()) {
            let date = new Date(session.exercise_date_time)
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let time = date.getHours() + ":" + date.getMinutes();
            let time_new = (date.getHours() + 1) + ":" + date.getMinutes();
            // 2021-08-20 12:00
            let date_string = year + "-" + month + "-" + day + " " + time + " - " + time_new;
            return (
                {
                    exercise_name: session.exercise_name,
                    exercise_date_time: date_string,
                }
            )
        }
        else {
            return null
        }
    })
    session_details = session_details.filter((session) => session !== null)
  return (
   <ScrollView style={styles.container}>
     
        <List.Accordion id={1}
        title="Group Members"
        theme={{ colors: { primary: Colors.light.tabIconSelected } }}
        left={props => <List.Icon {...props} icon="account" />}>
          {
           group_details?.group_members.map((item,index)=>{
            return(
              <TouchableOpacity key={index} style={{flex:1, flexDirection:'row',marginHorizontal:8,marginVertical:4,elevation:-100,backgroundColor:Colors.light.white,borderRadius:40}}>
                  <Avatar.Image size={30} style={{marginVertical:10,backgroundColor:Colors.light.white}} source={require('../assets/icon.png')} />
                  <Text style={styles.itemStyle}>
                    {item}
                  </Text>
              </TouchableOpacity>
            )
           
           }) 
          }
      </List.Accordion>
      <List.Accordion id={2}
        title="Upcoming Sessions"
        theme={{ colors: { primary: Colors.light.tabIconSelected } }}
        left={props => <List.Icon {...props} icon="clock-time-eight" />}>
        {
           session_details.map((item,index)=>{
            return(
              <TouchableOpacity key={index}  style={{flex:1, flexDirection:'row',marginHorizontal:8,marginVertical:4,elevation:-100,backgroundColor:Colors.light.white,borderRadius:40}}>
                  <Text style={styles.itemStyle}>
                    {item.exercise_name}
                  </Text>
                  <Text style={styles.itemStyle}>
                    {item.exercise_date_time}
                  </Text>
              </TouchableOpacity>
            )
           
           }) 
          }
      </List.Accordion>
      <TouchableOpacity style={{backgroundColor:Colors.light.tabIconSelected, margin:10, width:'50%', alignSelf:'center',borderRadius:10}} onPress={()=>{navigation.navigate('ScheduleGroup',{group_details:group_details})}}>
      <Button color={Colors.light.white}>Schedule Activity</Button>
      </TouchableOpacity>
     
   </ScrollView>
  )
}

export default GroupDetails

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:Colors.light.background
  },
  itemStyle: {
    padding: 10,
    fontFamily:'serif',
    fontWeight:'600',
    fontSize:12,
    margin:10,
 
  },
})