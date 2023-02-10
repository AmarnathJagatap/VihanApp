import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { Button, TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'; 
import { Apilink } from '../Constants/Apilink';
import Colors  from '../Constants/Colors';
import { AuthContext } from '../Context/AuthContext';

let token;
const CreateGroup = ({navigation}) => {
    const [selected, setSelected] = React.useState([]);
    const {getallusers,userData,alluserdata} = useContext(AuthContext)
    const [groupName, setgroupName] = useState('');
    let user_names=[];

    useEffect(()=>{
      getallusers()
    },[])


    let final_user_data = alluserdata.map((user) => {
      if ((userData?.user_info.username) !== (user.username)) {
          return user
      }
      else {
          return null
      }
  })
  final_user_data = final_user_data.filter(function (el) {
      return el != null;
  });
  const getAllArrayExcept=()=>{
    final_user_data.forEach((item)=>{
      if(selected.includes(item.id)){
        if (!user_names.includes(item.username)) {
          user_names.push(item.username)
        }
      }
    })
  }
  
  const handleSubmit = async()=>{
    getAllArrayExcept()
    await AsyncStorage.getItem('token').then((value) =>{
      if(value!==null){
        token = JSON.parse(value)
      }
    })
    await fetch(Apilink+'/auth/creategroup',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({group_name: groupName, group_members: user_names})
    })
    .then((response)=>response.json())
    .then((response)=>console.log(response))
    .then(()=>{ToastAndroid.showWithGravityAndOffset(
      "Group created Referesh the screen",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
  )})
    .then(navigation.goBack())
}
   
    const renderDataItem = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.selectedTextStyle}>{item.username}</Text>
                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
          <View>
          <TextInput 
                    mode='outlined'
                    style={styles.inputText}
                    outlineColor={Colors.light.tabIconSelected}
                    activeOutlineColor={Colors.light.tabIconSelected}
                    label="Group Name"
                    onChangeText={(groupName) => setgroupName(groupName)}
                    returnKeyType="next"
                     />
          </View>
            <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={final_user_data}
                labelField="username"
                valueField="id"
                placeholder="Select Users"
                value={selected}
                search
                searchPlaceholder="Search Username"
                onChange={e => {
                  setSelected(e);
                }}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color="black"
                        name="Safety"
                        size={20}
                    />
                )}
                renderItem={renderDataItem}
                renderSelectedItem={(item, unSelect) => (
                    <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                        <View style={styles.selectedStyle}>
                            <Text style={styles.textSelectedStyle}>{item.username}</Text>
                            <AntDesign color="black" name="delete" size={17} />
                        </View>
                    </TouchableOpacity>
                )}
            />
            <Button style={{backgroundColor:Colors.light.tabIconSelected, margin:10,alignSelf:'center',width:'50%'}} color={Colors.light.white} onPress={()=>{handleSubmit()}}>Submit</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.background,
        paddingTop: 30,
        flex:1
    },
    inputText:{
      marginHorizontal:10,
      marginVertical:7,
      backgroundColor:"#fff",
      height:50
  },
    dropdown: {
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        marginHorizontal:10,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal:10,
        borderRadius: 14,
        color:Colors.light.background,
        backgroundColor: 'white',
        shadowColor: '#000',
        marginTop: 8,
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    textSelectedStyle: {
        marginRight: 5,
        fontSize: 16,
    },
});

export default CreateGroup;