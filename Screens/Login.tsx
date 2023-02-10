import React, {useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions,TouchableOpacity,Image, ToastAndroid, KeyboardAvoidingView} from 'react-native';
import { storeToken } from '../Services/AsyncStorageService';
import { AuthContext } from '../Context/AuthContext';
import { Apilink } from '../Constants/Apilink';
import { TextInput } from 'react-native-paper';
import Lottie from 'lottie-react-native';
import  Colors  from '../Constants/Colors';


const { width, height } = Dimensions.get('window');

const SignIn = ({navigation}) => {

    useEffect(() => {
        setTimeout(() => {
          setAnimating(false);    
        }, 2000);
      }, []);
    
    
      const [animating, setAnimating] = useState(true);
              
      const AnimatingScreen = () => {
        return(
          <View style={styles.container}>
                <Lottie source={require('../assets/loading.json')} autoPlay loop style={{width:250,height:250,alignSelf:'center'}} />          
          </View>
        )
      }
    
     
    
    
    const [username,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [securetext, setSecureText] = React.useState(true);

    const secureText=()=>{
        setSecureText(!securetext)
    }

    const {setIsLoggedIn, setUserToken} = useContext(AuthContext);


    const clearTextInput = () => {
        setUserName('')
        setPassword('')
      }

    const create = () => {
        return(
            <Text  onPress={()=>{navigation.navigate('RegisterScreen')}} style={{color:Colors.light.tabIconSelected, fontWeight:'900'}}>Create an Account</Text>
        )
    }
    

    const handleSubmitButton = async () => {
        const formData = { username, password,}
        if(username===""|| password===""){
            ToastAndroid.showWithGravityAndOffset(
              "Username and Password are Compulsory",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
            );
          }else{
            const res = await fetch(Apilink+`auth/login`, {
            method: "POST",
            body : JSON.stringify({
                "username": formData.username,
                "password": formData.password
            }),
            headers: {
                'Content-Type' : 'application/json',
            }
            })
            const data = await res.json()
                if(data.token){
                    setUserToken("Token "+data.token);
                    console.log(data.token)
                    storeToken("Token "+data.token)
                    setIsLoggedIn(true);
                    clearTextInput();
                }
                else{
                console.log(data)
                if (data.hasOwnProperty('non_field_errors') ) {
                    ToastAndroid.showWithGravityAndOffset(
                    "Unable to log in with provided credentials.",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                    );
                }
                else {
                ToastAndroid.showWithGravityAndOffset(
                    "Some error occured plz try again later",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                }
                }
          }
        }
    
   
    return (
        <>{
            animating?<AnimatingScreen/>:<KeyboardAvoidingView style={styles.container}>  
            <View>
                <Text style={{fontSize:40,textAlign:'center'}}>Vihaan</Text>
            </View>      
                        <TextInput 
                        mode='outlined'
                        style={styles.inputText}
                        outlineColor={Colors.light.tabIconSelected}
                        activeOutlineColor={Colors.light.tabIconSelected}
                        label="Username"
                        onChangeText={(UserName) => setUserName(UserName)}
                        returnKeyType="next"
                         />
                        <TextInput 
                        mode='outlined'
                        style={styles.inputText}
                        secureTextEntry={securetext}
                        outlineColor={Colors.light.tabIconSelected}
                        activeOutlineColor={Colors.light.tabIconSelected}
                        right={securetext?<TextInput.Icon icon="eye" onPress={()=>{secureText()}} />:<TextInput.Icon icon="eye-off" onPress={()=>{secureText()} } />}
                        label="Password" 
                        onChangeText={(Password) => setPassword(Password)}
                        returnKeyType="next"/>
                        <TouchableOpacity
                                onPress={handleSubmitButton}
                            >
                        <View style={{ ...styles.button, backgroundColor: Colors.light.tabIconSelected, shadowOffset: { width: 2, height: 2 }, shadowColor: '#000', shadowOpacity: .2, elevation: 3 }}>
                            <Text style={{ fontWeight: 'bold', color: '#FFF' }}>
                                LOGIN
                            </Text>
                        </View>
                        </TouchableOpacity>
                        <Text style={{marginTop:14,alignSelf:"center",fontSize:15}}>Not registerd yet? {create()}</Text>
                </KeyboardAvoidingView>
        }
        </>
        
    )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center'
    },
   
    buttonContainer: {
        justifyContent: "center",
    },
    button: {
        backgroundColor: '#FFF',
        marginVertical: 5,
        marginHorizontal: 30,
        height: height / 14,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25
    },
    buttonText: {
        fontSize: width / 23,
        fontWeight: "bold"
    },
    textStyle: {
        color: '#FFF',
        fontFamily: 'sans-serif-medium',
        fontWeight: 'bold'
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: width,
        position: "absolute",
        top: 80
    },
    loginContainer: {
        height: height / 3,
        // backgroundColor: '#FFF',
        top: null,
        justifyContent: "center",
    },
    inputText:{
        marginHorizontal:10,
        marginVertical:7,
        backgroundColor:"#fff"
    }
 


})