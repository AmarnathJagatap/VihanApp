import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Apilink } from '../Constants/Apilink';

import  Colors  from '../Constants/Colors';
import SelectDropdown from 'react-native-select-dropdown';

let token;
let excerciseArray = [];
const ScheduleGroup = ({route,navigation}) => {
  const {group_details} = route.params;
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [allExcercise, setAllExcercise] = useState([]);
  const [excercise_name,setExcercise_name] = useState('');
  const fetchExcercise = async()=>{
    await AsyncStorage.getItem('token').then((value) =>{
      if(value!==null){
        token = JSON.parse(value)
      }
    })
    await fetch(Apilink + '/exercise/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
    .then((response)=>response.json())
    .then((response)=>setAllExcercise(response?.exercises))
  }
  useEffect(() => {
    fetchExcercise();
    putExcerciseinArray();

  }, [])
  const putExcerciseinArray = () =>{
    allExcercise.forEach((item)=>{
      if (!excerciseArray.includes(item.name)) {
        excerciseArray.push(item.name)
      }
    })
  }
  const handleSubmit = async () => {
     const date_json = selectedDate.getTime()
     console.log(date_json)
    await AsyncStorage.getItem('token').then((value) =>{
      if(value!==null){
        token = JSON.parse(value)
      }
    })

    await fetch(Apilink + '/auth/schedulegroupsession', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            group_name: group_details?.group_name,
            exercise_name: excercise_name,
            exercise_date_time: date_json,
        })
    })
    .then(()=>navigation.goBack())
  
}
  

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };


  return (
    <View style={{ flex: 1, }}>
      <View style={styles.SectionStyle}>
      <SelectDropdown
                  dropdownStyle={{borderRadius:20}}
                  search={true}
                  rowTextStyle={{fontSize:18, fontWeight:'500'}}
                  data={excerciseArray}
                  onSelect={(selectedItem) => {
                    setExcercise_name(selectedItem)
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                  }}
                  defaultButtonText=" Select Company"
                  buttonStyle={{
                    borderWidth: 1,
                    borderRadius:5,
                    borderColor: '#493d8a',
                    height: 60,
                    marginVertical:5,
                    alignItems: 'center',
                    width:"100%",       
                  }}
                />
        </View>           
      
          <Button style={{backgroundColor:Colors.light.tabIconSelected,alignSelf:'center',width:'60%'}} color={Colors.light.white} onPress={showDatePicker} >Select Date and Time</Button>     

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <Button style={{backgroundColor:Colors.light.tabIconSelected, margin:10,alignSelf:'center',width:'50%'}} color={Colors.light.white} onPress={()=>{handleSubmit()}}>Submit</Button>     

    </View>
  );
};

const styles=StyleSheet.create({
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
SectionStyle: {
  flexDirection: 'row',
  height: 60,
  margin: 10,
},
})

export default ScheduleGroup;