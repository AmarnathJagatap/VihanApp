import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Platform, ToastAndroid, Linking, Alert, RefreshControl } from 'react-native';
import { Entypo,FontAwesome } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Apilink } from '../../Constants/Apilink';
import MyJournal from '../MyJournal';
import { useNavigation } from '@react-navigation/native';
import { TextInput,Button } from 'react-native-paper';
import Colors from '../../Constants/Colors';
let token;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const MainJournal = () => {
  const [myJournal,setMyJounal] = useState();
  const [journalText, setJournalText] = useState('');
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getmyJournal();
    }, 2000);
  }, []);
  
  const getmyJournal = async()=>{
    await AsyncStorage.getItem('token').then((value) =>{
        if(value!==null){
          token = JSON.parse(value)
        }
      })
    await fetch(Apilink+`/auth/getmyjourney`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        }
      })
    .then((response)=>response.json())
    .then((response)=>setMyJounal(response?.my_journey))

}
    useEffect(()=>{
      getmyJournal();
    },[])


    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const d = new Date();
  let day = d.getDate();
  let year = d.getFullYear();
  let month = monthNames[d.getMonth()];
  
  const CurrentDate = `${day}th ${month} ${year}` 


  const CheckDate = myJournal?.my_journey?.filter(object => object.date===CurrentDate)

   

   
  const [docData, setDocData] = useState(null);
  const getDocData = async()=>{
      await AsyncStorage.getItem('token').then((value) =>{
          if(value!==null){
            token = JSON.parse(value)
          }
        })
      await fetch(Apilink+`/auth/getdocdata`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          }
        })
      .then((response)=>response.json())
      .then((response)=>setDocData(response))

  }
  useEffect(()=>{
      getDocData();
  },[])
  

  const supportedURL = docData?.doctor_info?.calendly_link;
  
  const OpenURLButton = ({ url, children }) => {
      const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          await Linking.openURL(url);
      } else {
          Alert.alert(`Don't know how to open this URL: ${url}`);
      }
      }, [url]);
  
      return <TouchableOpacity onPress={handlePress} style={styles.calendarcontainer}>
      <Text style={{ fontSize: 15,color:"rgba(0, 0, 0, 0.40)",fontFamily:'Poppins-Regular',}}>Calender</Text>                                
    </TouchableOpacity>;
  };

    
   

   
  return (
    <ScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
    <View>
      <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:17}}>Select Date</Text>
      <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <OpenURLButton url={supportedURL} children={"Schedule Session"}/>
         <TouchableOpacity>
         <FontAwesome name="filter" size={35} color={'rgba(0, 0, 0, 0.40)'} style={{justifyContent:'center',alignItems:'center',marginVertical:8,marginRight:8}}/>
         </TouchableOpacity>
      </View>               
    </View>
    {
      CheckDate?.length>0?<></>:
      <TouchableOpacity onPress={()=>{navigation.navigate('CreateJournal')}}>
              <LinearGradient
                    colors={['rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)']} style={{width:windowWidth-30,height:windowHeight/20,borderRadius:10,alignItems:'center',justifyContent:'center',margin:15}}>
                      <Text style={{ fontSize: 12,color:"#ffffff",fontFamily:'Poppins-Regular'}}>Add Journal</Text>
              </LinearGradient>
    </TouchableOpacity> 
    }
    

    {/*<View>
      <View style={{}}>
      <TextInput 
            value={journalText}
             mode='outlined'
             style={{
                 marginHorizontal:22,
                 height:50,
                 backgroundColor:Colors.light.white,
                 marginVertical:10
                 }} 
            label="Add Journal"
            outlineColor={'rgba(0,0,0,0.55)'}
            activeOutlineColor={'rgba(0,0,0,0.65)'}
            onChangeText={(text)=>setJournalText(text)}
        />
      {journalText.length>0? <TouchableOpacity>
        <Button style={{backgroundColor:'rgba(0,0,0,0.45)',width:windowWidth/4,margin:10,alignSelf:'center'}} textColor="white" onPress={()=>{decisionFunction()}}>Add</Button>
        </TouchableOpacity>:<></>}
         
      </View>               
      </View>*/}

    <View>
      <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:17}}>Recents</Text>
      {myJournal?.my_journey.map((item,index)=>(
         <TouchableOpacity onPress={()=>{navigation.navigate('SpecificJournalDetail',{name:item.date,myJournal:item})}} style={{flexDirection:'row',justifyContent:'space-evenly',marginVertical:10}}>
         <LinearGradient colors={['#FBBAA8','rgba(251, 239, 200, 0) @ 100%']} style={{width:30,height:30,borderRadius:30}}>              
         </LinearGradient>
         <Text style={{ fontSize: 15,color:"rgba(0, 0, 0, 0.40)",fontFamily:'Poppins-Regular',marginVertical:5}}>{item.date}</Text>        
           <FontAwesome name="chevron-right" size={20} color={'rgba(0, 0, 0, 0.60)'} style={{justifyContent:'center',alignItems:'center',marginVertical:8,marginRight:8}}/>
         </TouchableOpacity>                
      ))}     
      </View>
      
    
</ScrollView>
  );
};

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
  }
});

export default MainJournal;