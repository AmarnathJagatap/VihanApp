import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { Apilink } from '../Constants/Apilink';
import Colors from '../Constants/Colors';
import Lottie from 'lottie-react-native';


let token;
const Usernoteslist = ({navigation}) => {
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
            <Lottie source={require('../../assets/loading.json')} autoPlay loop style={{width:250,height:250,alignSelf:'center'}} />          
      </View>
    )
  }
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const getUserNotes =async()=>{
   await AsyncStorage.getItem('token').then((value) =>{
      if(value!==null){
        token = JSON.parse(value)
      }
    })
    fetch(Apilink+`auth/getuserdoc`, {
      method: "GET",
      headers: {
          'Content-Type' : 'application/json',
          'Authorization' : token,
      }
      })
      .then((response)=>response.json())
      .then((responseJson)=>{
        setMasterDataSource(responseJson?.user_activity)
        setFilteredDataSource(responseJson?.user_activity)
       // console.log(filteredDataSource)
      }).catch((error)=>{
        console.log(error);
      })

  }

  useEffect(() => {
    getUserNotes();   
  }, []);

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
      <TouchableOpacity  onPress={() => navigation.navigate('UserSessionDeatil',{name:item?.username, sessionNotes: item})} style={{flex:1, flexDirection:'row',marginHorizontal:8,marginVertical:4,elevation:-100,backgroundColor:Colors.light.white,paddingHorizontal:10,borderRadius:40}}>
        <Avatar.Image size={30} style={{marginVertical:10,backgroundColor:Colors.light.white}} source={require('../../assets/UserIcon.png')} />
        <Text style={styles.itemStyle}>
          {item?.username.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>{
      animating?<AnimatingScreen/>:
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search here"
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>}</>
  );
};

const styles = StyleSheet.create({
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
});

export default Usernoteslist;
