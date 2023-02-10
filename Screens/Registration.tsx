import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { storeToken } from '../Services/AsyncStorageService';
import { AuthContext } from '../Context/AuthContext';
import { Apilink } from '../constants/Apilink';
import SelectDropdown from 'react-native-select-dropdown';
import Lottie from 'lottie-react-native';
import  Colors  from '../Constants/Colors';



const RegisterScreen = ({navigation}) => {

  useEffect(() => {
    if(animating){
      <AnimatingScreen/>
    }
    setTimeout(() => {
      setAnimating(false);    
    }, 2000)
    
   
  }, []);


  const [animating, setAnimating] = useState(true);
          
  const AnimatingScreen = () => {
    return(
      <View style={{ flex: 1,
        backgroundColor:'#fff',
        justifyContent: 'center',
    }}>
            <Lottie source={require('../assets/loading.json')} autoPlay loop style={{width:250,height:250,alignSelf:'center'}} />          
      </View>
    )
  }

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [company, setcompany] = useState('');
  const [profile_score, setprofilescore] = useState(0);
  const [showDropDown, setShowDropDown] = useState(false);
  const [role, setRole] = useState('');


  const clearTextInput = () => {
    setUserName('')
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setcompany('')
    setprofilescore(0)
  }

  const {setUserToken} = useContext(AuthContext);

  const companylist = ["IISC", "ARTPARK", "None"]
  const rolelist =["doctor","None"]

  const [securetext, setSecureText] = React.useState(true);

  const secureText=()=>{
      setSecureText(!securetext)
  }


  const handleSubmitButton = async () => {
    if(username==="" || email==="" || password===""){
      ToastAndroid.showWithGravityAndOffset(
        "Username, Email and Password are Compulsory",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }else{
    const formData = { username, email, password, first_name,last_name, company,profile_score,role }
    const res = await fetch(Apilink+`auth/registeruser`, {
      method: "POST",
      body : JSON.stringify({
        "username": formData.username,
        "password": formData.password,
        "email": formData.email,
        "first_name": formData.first_name,
        "last_name": formData.last_name,
        "company": formData.company,
        "profile_score": formData.profile_score,
        "role": formData.role,
        "mentalWellnessScore": 0,
        "stressScore":0
      }),
      headers: {
        'Content-Type' : 'application/json',
      }
    })
    const data = await res.json()
    if(data.token){
      setUserToken("Token "+data.token);
      storeToken("Token "+data.token)
      navigation.navigate('Onboarding')
      clearTextInput()
    }
    else{
      console.log(data)
      if (data.hasOwnProperty('email') && data.hasOwnProperty('username')) {
        ToastAndroid.showWithGravityAndOffset(
          "A user with this email and username already exists",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
    }
    else if (data.hasOwnProperty('email')) {
      ToastAndroid.showWithGravityAndOffset(
        "A user with this email already exists",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
    else if (data.hasOwnProperty('username')) {
      ToastAndroid.showWithGravityAndOffset(
        "A user with this username already exists",
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
      animating?<AnimatingScreen/>:
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
       <View>
            <Image source={require('../assets/logo.png')} style={{alignSelf:'center',resizeMode:'center',marginHorizontal:10}}/>
        </View>  
        <KeyboardAvoidingView enabled>
            <TextInput
              mode='outlined'
              style={styles.inputText}
              outlineColor={Colors.light.tabIconSelected}
              activeOutlineColor={Colors.light.tabIconSelected}
              onChangeText={(FirstName) =>
                setFirstName(FirstName)
              }
              label="Enter First Name"
              returnKeyType="next"
            />
            <TextInput
              mode='outlined'
              style={styles.inputText}
              outlineColor={Colors.light.tabIconSelected}
              activeOutlineColor={Colors.light.tabIconSelected}
              onChangeText={(LastName) =>
                setLastName(LastName)
              }
              label="Enter Last Name"
              placeholderTextColor="#8b9cb5"
              returnKeyType="next"
            />
            <TextInput
              mode='outlined'
              style={styles.inputText}
              outlineColor={Colors.light.tabIconSelected}
              activeOutlineColor={Colors.light.tabIconSelected}
              onChangeText={(UserName) => setUserName(UserName)}
              label="Enter Username"
              returnKeyType="next"
            />
            <TextInput
              mode='outlined'
              style={styles.inputText}
              outlineColor={Colors.light.tabIconSelected}
              activeOutlineColor={Colors.light.tabIconSelected}
              onChangeText={(UserEmail) => setEmail(UserEmail)}
              label="Enter Email"
              returnKeyType="next"
            />
            <TextInput
              mode='outlined'
              style={styles.inputText}
              outlineColor={Colors.light.tabIconSelected}
              secureTextEntry={securetext}
              activeOutlineColor={Colors.light.tabIconSelected}
              onChangeText={(UserPassword) =>
                setPassword(UserPassword)
              }
              right={securetext?<TextInput.Icon icon="eye" onPress={()=>{secureText()}} />:<TextInput.Icon icon="eye-off" onPress={()=>{secureText()} } />}
              label="Enter Password"
              returnKeyType="next"
            />
             <View style={styles.SectionStyle}>
              <SelectDropdown
                  dropdownStyle={{borderRadius:20}}
                  rowTextStyle={{fontSize:18, fontWeight:'500'}}
                  data={companylist}
                  onSelect={(selectedItem) => {
                    setcompany(selectedItem)
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
                  defaultButtonText="Select Company"
                  buttonStyle={{
                    borderWidth: 1,
                    borderRadius:5,
                    borderColor: Colors.light.tabIconSelected,
                    height: 60,
                    marginVertical:5,
                    alignItems: 'center',
                    width:"100%",       
                  }}
                />
              </View>
              <View style={styles.SectionStyle}>

              <SelectDropdown
                 dropdownStyle={{borderRadius:20}}
                 rowTextStyle={{fontSize:18, fontWeight:'500'}}
                  data={rolelist}
                  onSelect={(selectedItem) => {
                    setRole(selectedItem)
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
                  defaultButtonText=" Select Role"
                  buttonStyle={{
                    borderWidth: 1,
                    borderRadius:5,
                    borderColor: Colors.light.tabIconSelected,
                    height: 60,
                    marginVertical:5,
                    alignItems: 'center',
                    width:"100%",     
                  }}
                />     
            </View>
          
          <TouchableOpacity
          onPress={handleSubmitButton}
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>}</>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 60,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: Colors.light.tabIconSelected,
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#A020F0',
    height: 50,
    alignItems: 'center',
    borderRadius: 30,
    marginHorizontal:10,
    marginVertical:10
  },
  inputText:{
    marginHorizontal:10,
    marginVertical:7,
    backgroundColor:"#fff"
},
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  logosection : {
    color: Colors.light.tabIconSelected,
    marginTop: 50,
    fontWeight : 'bold',
    fontSize : 35,
  }
});