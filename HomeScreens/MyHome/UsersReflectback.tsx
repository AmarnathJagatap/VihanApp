import {StyleSheet, Text, View,Image, TouchableOpacity, Dimensions, ToastAndroid, FlatList, TextInput, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Apilink } from '../../Constants/Apilink';
import Colors from '../../Constants/Colors';
import { Avatar } from 'react-native-paper';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-virtualized-view'



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let token;

const UsersReflectBack = () => {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
        getUserNotes();
      }, 2000);
    }, []);
  
    
    const getUserNotes =async()=>{
     await AsyncStorage.getItem('token').then((value) =>{
        if(value!==null){
          token = JSON.parse(value)
        }
      })
      fetch(Apilink+`/auth/getnotesdoc`, {
        method: "GET",
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : token,
        }
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
          setMasterDataSource(responseJson?.all_data)
          setFilteredDataSource(responseJson?.all_data)
        }).catch((error)=>{
          console.log(error);
        })
  
    }
  
    useEffect(() => {
      getUserNotes();   
    }, []);

    const isFocused = useIsFocused();
 
  useEffect(() => {
    getUserNotes();
  }, [isFocused]);
  
    const searchFilterFunction = (text) => {
      // Check if searched text is not blank
      if (text) {
        // Inserted text is not blank
        // Filter the masterDataSource and update FilteredDataSource
        const newData = masterDataSource.filter(function (item) {
          // Applying filter for the inserted text in search bar
          const itemData = item?.username
            ? item?.username.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setFilteredDataSource(newData);
        setSearch(text);
      } else {
        // Inserted text is blank
        // Update FilteredDataSource with masterDataSource
        setFilteredDataSource(masterDataSource);
        setSearch(text);
      }
    };
  
    const ItemView = ({ item }) => {
        console.log(item)
      return (
        <TouchableOpacity  onPress={() => navigation.navigate('UserReflecBackDetailScreen',{name:item?.username, sessionNotes: item?.session_notes})}>
        <LinearGradient
            colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardcontainer}>
              <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:5}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',width:windowWidth/3}}>
                    <Avatar.Image size={30} style={{marginVertical:10,backgroundColor:Colors.light.white}} source={require('../../assets/man.png')} />
                    <Text style={{marginHorizontal:10,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:13}}>{item?.username.toUpperCase()}</Text>
                    </View>                

                <FontAwesome name="chevron-right" size={17} color={'rgba(0, 0, 0, 0.60)'} style={{justifyContent:'center',alignItems:'center',marginVertical:8,marginRight:8}}/>
                </View>

          </LinearGradient>
          
        </TouchableOpacity>
      );
    };
  return (
    <ScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View>
          <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:15}}>Users Reflect Back</Text>
         
          <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          placeholder="Search here"
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
        />
        </View>

    </ScrollView>
  )
}

export default UsersReflectBack

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
      justifyContent:'space-evenly',
      backgroundColor: '#fff',
      height:windowHeight/15,
      marginVertical:5,
      marginHorizontal:22,
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
    },
    textInputStyle: {
        height: windowHeight/18,
        marginHorizontal:22,
        marginVertical:15,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: Colors.light.tabIconSelected,
        backgroundColor: '#FFFFFF',
        borderRadius:30,
      },
  });