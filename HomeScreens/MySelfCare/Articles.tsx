import { StyleSheet, Text, View,Image, TouchableOpacity, Dimensions, ImageBackground, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { AuthContext } from '../../Context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Apilink } from '../../Constants/Apilink';
import { useNavigation } from '@react-navigation/native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let token;
const Articles = () => {
    const {userData} = useContext(AuthContext);
    const [Articles, setArticles] = useState();

    const navigation = useNavigation();

    const getArticles =async()=>{
      await AsyncStorage.getItem('token').then((value) =>{
         if(value!==null){
           token = JSON.parse(value)
         }
       })
       fetch(Apilink+`/blogs/getallblogdata`, {
         method: "GET",
         headers: {
             'Content-Type' : 'application/json',
             'Authorization' : token,
         }
         })
         .then((response)=>response.json())
         .then((responseJson)=>{
           
           setArticles(responseJson)
         }).catch((error)=>{
           
         })
   
     }
   
     useEffect(() => {
      getArticles();   
     }, []);
  return (
    <View>
      <LinearGradient
        // Button Linear Gradient
        colors={['#6264AF','#6275CF','#6276EF','#6277FF','#6288EC','#6299EF']} style={styles.container}>
      <View style={styles.header}>
          <View style={styles.propicrow}>
          <Image source={require('../../assets/propic.jpg')} style={styles.profilePic} />
          <Text style={styles.name}>Hi {userData?.user_info?.username}</Text>
          </View>
          <View style={styles.icons}>
            
          </View>
      </View>
      <TouchableOpacity>
      <LinearGradient
        // Button Linear Gradient
        colors={['#FFFFFF','rgba(255, 255, 255, 8)','rgba(255, 255, 255, 5) @ 100%']} style={styles.button}>
                  <Text style={styles.buttonText}>Articles</Text>
      </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>

    <View style={{flexDirection:'row',margin:10}}>
    <TouchableOpacity>
        <LinearGradient
            colors={['rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.30)','rgba(0, 0, 0, 0.20)','rgba(0, 0, 0, 0.40)']}
             style={{
            width:windowWidth/3.5,
             height:windowHeight/20,
             borderRadius:10,
             alignItems:'center',
             justifyContent:'center',
             marginVertical:15,
             marginHorizontal:5}}>
                <Text style={{ fontSize: 12,color:"#ffffff",fontFamily:'Poppins-Bold'}}>For me</Text>
        </LinearGradient>
    </TouchableOpacity>  
    <TouchableOpacity>
        <LinearGradient
            colors={['rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.30)','rgba(0, 0, 0, 0.20)','rgba(0, 0, 0, 0.40)']}
             style={{
            width:windowWidth/3.5,
             height:windowHeight/20,
             borderRadius:10,
             alignItems:'center',
             justifyContent:'center',
             marginVertical:15,
             marginHorizontal:5}}>
                <Text style={{ fontSize: 12,color:"#ffffff",fontFamily:'Poppins-Bold'}}>Anxiety</Text>
        </LinearGradient>
    </TouchableOpacity>  
    <TouchableOpacity>
        <LinearGradient
            colors={['rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.30)','rgba(0, 0, 0, 0.20)','rgba(0, 0, 0, 0.40)']}
             style={{
            width:windowWidth/3.5,
             height:windowHeight/20,
             borderRadius:10,
             alignItems:'center',
             justifyContent:'center',
             marginVertical:15,
             marginHorizontal:5}}>
                <Text style={{ fontSize: 12,color:"#ffffff",fontFamily:'Poppins-Bold'}}>Stress</Text>
        </LinearGradient>
    </TouchableOpacity>  
    </View>

    <ScrollView>
    <View>
      {Articles?.length>0?
      Articles.map((item)=>(
        <ImageBackground borderRadius={30} source={require('../../assets/Article.png')} style={{height:windowHeight/4,marginHorizontal:20,justifyContent:'space-evenly'}}>
        <View style={{flex:1,alignItems:'flex-start',position:'absolute',right:10,top:20}}>
            <Text style={{fontSize:20,color:'#ffffff'}}>
                {item.title}            </Text>
          
        </View>    
        <TouchableOpacity onPress={()=>{navigation.navigate('ArticalDetail',{name:item.title, ArticleDetail: item})}} style={{position:'absolute',bottom:20,right:10,justifyContent:"center",borderColor:'#ffffff',borderWidth:2,width:windowWidth/3.4,height:windowHeight/18,borderRadius:20,alignItems:'center'}}>
            <Text style={{fontSize:14,color:'#ffffff'}}>Read More</Text>
        </TouchableOpacity>       
      </ImageBackground>  
      )):<></>}
             
      </View>
      </ScrollView>
    </View>

  )
}

export default Articles

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
        backgroundColor: '#fff',
        height:windowHeight/3.8,
        marginHorizontal:10,
        borderRadius: 30,
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
})