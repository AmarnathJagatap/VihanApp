import { StyleSheet,ScrollView, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MySelfMain = () => {
    const navigation = useNavigation();
  return (
    <ScrollView style={{height:windowHeight/1.55}}>
          <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:17}}>Programs</Text>
          <LinearGradient
            colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardcontainer}>
                <Image source={require('../../assets/cardImage.png')} style={{borderRadius:30,width:windowWidth-20,height:windowHeight/5.8}}/>
                <View style={styles.meetingrow}>
                    <View style={styles.propicrow}>
                        <View>
                          <Text style={styles.meetingrowname}>Programs</Text>
                        </View>
                    </View>
                    <View>
                      <TouchableOpacity onPress={()=>{navigation.navigate("Programs")}}>
                      <LinearGradient
                            colors={['rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)']} style={{width:windowWidth/3,height:windowHeight/20,borderRadius:10,alignItems:'center',justifyContent:'center',margin:10}}>
                              <Text style={{ fontSize: 12,color:"#ffffff",fontFamily:'Poppins-Regular'}}>Explore</Text>
                      </LinearGradient>
                      </TouchableOpacity>
                    </View>
          </View>
        </LinearGradient>     

         <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:17}}>Lessons</Text>
          <LinearGradient
            colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardcontainer}>
                <Image source={require('../../assets/Explore.png')} style={{borderRadius:30,width:windowWidth-20,height:windowHeight/5.8}}/>
                <View style={styles.meetingrow}>
                    <View style={styles.propicrow}>
                        <View>
                          <Text style={styles.meetingrowname}>Lessons</Text>
                        </View>
                    </View>
                    <View>
                      <TouchableOpacity onPress={()=>{navigation.navigate("Lessons")}}>
                      <LinearGradient
                            colors={['rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)']} style={{width:windowWidth/3,height:windowHeight/20,borderRadius:10,alignItems:'center',justifyContent:'center',margin:10}}>
                              <Text style={{ fontSize: 12,color:"#ffffff",fontFamily:'Poppins-Regular'}}>Explore</Text>
                      </LinearGradient>
                      </TouchableOpacity>
                    </View>
          </View>
        </LinearGradient> 

        <Text style={{marginHorizontal:30,marginTop:10,marginBottom:5,fontFamily:'Poppins-Regular',fontSize:17}}>Articles</Text>
          <LinearGradient
            colors={['rgba(195, 195, 238, 0.76) @ 8.68%','rgba(177, 177, 236, 0.52) @ 38.89%','rgba(201, 201, 229, 0.32) @ 99.99%','rgba(255, 255, 255, 7) @ 100%']} style={styles.cardcontainer}>
                <Image source={require('../../assets/selfcare1.png')} style={{borderRadius:30,width:windowWidth-20,height:windowHeight/5.8}}/>
                <View style={styles.meetingrow}>
                    <View style={styles.propicrow}>
                        <View>
                          <Text style={styles.meetingrowname}>Articles</Text>
                        </View>
                    </View>
                    <View>
                      <TouchableOpacity onPress={()=>{navigation.navigate('Articles')}}>
                      <LinearGradient
                            colors={['rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)','rgba(0, 0, 0, 0.40)']} style={{width:windowWidth/3,height:windowHeight/20,borderRadius:10,alignItems:'center',justifyContent:'center',margin:10}}>
                              <Text style={{ fontSize: 12,color:"#ffffff",fontFamily:'Poppins-Regular'}}>Explore</Text>
                      </LinearGradient>
                      </TouchableOpacity>
                    </View>
          </View>
        </LinearGradient> 
    </ScrollView>
  )
}

export default MySelfMain

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