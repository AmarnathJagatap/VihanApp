import { Dimensions, StyleSheet, Text, View,  Linking, Alert } from 'react-native'
import React, { useCallback } from 'react'
import { Avatar,Button } from 'react-native-paper';
import { Colors } from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UserSessiondetailScreen = ({route,navigation}) => {
    const {sessionNotes,name} = route.params;
    const supportedURL = "https://calendly.com/kreedamail/kreeda-ai-therapy";
    
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
    
        return <Button style={{backgroundColor:Colors.light.white,margin:20}} color={Colors.light.text} onPress={handlePress}>{children}</Button>;
    };

  return (
    <View style={styles.container}>
        <LinearGradient style={styles.cardcontainer} colors={['#60efff','#60afef','#0061ff']}>           
                <Avatar.Image style={{backgroundColor:Colors.light.background}} size={windowHeight/8} source={require('../../assets/UserIcon.png')}/>        
                <Text style={{color:Colors.light.text, fontFamily:'serif', fontWeight:'bold', fontSize:18}}>{sessionNotes['name']}</Text>
                <Text style={{color:Colors.light.text, fontFamily:'serif', fontWeight:'bold', fontSize:15}}>{sessionNotes['email']}</Text>
                <OpenURLButton url={supportedURL} children={"Schedule Session"}/>
        </LinearGradient>
    </View>
  )
}

export default UserSessiondetailScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.light.background
        
    },
    cardcontainer:{
        alignItems:'center',
        height: windowHeight/2.5,
        width: windowWidth-40,
        borderRadius:20,
        justifyContent:'center',
        elevation:40,
    }
})