import { Dimensions, FlatList, RefreshControl, SafeAreaView,Image,  StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Apilink } from '../Constants/Apilink'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Button } from 'react-native-paper';
import  Colors  from '../Constants/Colors';
import { ScrollView } from 'react-native-virtualized-view';
import Lottie from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
let token;
const GroupData = ({navigation}) => {
  useEffect(() => {
    if(animating){
      <AnimatingScreen/>
    }
    setTimeout(() => {
      setAnimating(false);    
    }, 3000)
    
   
  }, []);


  const [animating, setAnimating] = useState(true);
          
  const AnimatingScreen = () => {
    return(
      <View style={{ flex: 1,
        backgroundColor:Colors.light.background,
        justifyContent: 'center',
    }}>
            <Lottie source={require('../assets/loading.json')} autoPlay loop style={{width:250,height:250,alignSelf:'center'}} />          
      </View>
    )
  }
    const [groups, setgroups] = useState([]);
   
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetch_data();
        wait(2000).then(() => setRefreshing(false));
      }, []);
      const fetch_data = async () => {
        await AsyncStorage.getItem('token').then((value) =>{
            if(value!==null){
              token = JSON.parse(value)
            }
          })
         await fetch(Apilink + '/auth/getgroupdata', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then((response)=>response.json())
        .then((response)=>setgroups(response.group_activity))
        
    }
    useEffect(() => {
       
        fetch_data();
    }, [])

    const ItemView = ({ item }) => {

        return (
          <TouchableOpacity  onPress={() => navigation.navigate('GroupDetails',{name:item?.group_name,group_details:item})} style={{flex:1, flexDirection:'row',marginHorizontal:8,marginVertical:4,elevation:-100,backgroundColor:Colors.light.white,paddingHorizontal:10,borderRadius:40}}>
            <Avatar.Image size={30} style={{marginVertical:10,backgroundColor:Colors.light.white}} source={require('../assets/icon.png')} />
            <Text style={styles.itemStyle}>
              {item?.group_name.toUpperCase()}
            </Text>
          </TouchableOpacity>
        );
      };
  return (
    <>{
      animating?<AnimatingScreen/>:
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
    
    // Button Linear Gradient
    colors={['#6264AF','#6275CF','#6276EF','#6277FF','#6288EC','#6299EF']} style={styles.cardcontainer}>
  <View style={styles.header}>
      <View style={styles.propicrow}>
      <Image source={require('../assets/propic.jpg')} style={styles.profilePic} />
      <Text style={styles.name}>Hi Dhruv</Text>
      </View>
      <View style={styles.icons}>
        <Image source={require('../assets/brainstromskill.png')} style={styles.icon} />
        <Image source={require('../assets/sleep.png')} style={styles.icon} />
      </View>
  </View>
  <TouchableOpacity onPress={()=>{}}>
  <LinearGradient
    // Button Linear Gradient
    colors={['#FFFFFF','rgba(255, 255, 255, 8)','rgba(255, 255, 255, 5) @ 100%']} style={styles.button}>
              <Text style={styles.buttonText}>Community</Text>
  </LinearGradient>
  </TouchableOpacity>
</LinearGradient>
      <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
        <Button style={{backgroundColor:Colors.light.tabIconSelected, alignItems:'center', justifyContent:'center', alignSelf:'center', width:windowWidth/2,margin:10,borderRadius:20}} color={Colors.light.white} onPress={()=>{navigation.navigate('CreateGroup')}}>Create Group</Button>
        
        <FlatList
          data={groups}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
        />
      </ScrollView>
    </SafeAreaView>}</>
  )
}

export default GroupData

const styles = StyleSheet.create({
  cardcontainer: {
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
    container: {
        backgroundColor: Colors.light.background,
        flex:1,
      },
      itemStyle: {
        padding: 10,
        fontFamily:'serif',
        fontWeight:'600',
        fontSize:12,
        margin:10,
     
      },
      textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: Colors.light.tabIconSelected,
        backgroundColor: '#FFFFFF',
        borderRadius:30,
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
      },
      meetingrowtime:{
        fontSize: 11,
        color:"#000",
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
})