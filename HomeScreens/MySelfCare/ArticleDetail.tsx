import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../Constants/Colors';
import { WebView } from 'react-native-webview';



const ArticleDetail = ({route}) => {
    const {name, ArticleDetail} = route.params;
  return (
    <View style={styles.container}>
      <Text style={{ textAlign:'center',fontSize: 15,color:"rgba(0, 0, 0, 0.80)",fontFamily:'Poppins-Regular'}}>Author:  {ArticleDetail.author}</Text>        
      <Text style={{ textAlign:'center', fontSize: 12,color:"rgba(0, 0, 0, 0.80)",fontFamily:'Poppins-Regular'}}>{ArticleDetail.date}</Text> 
      <WebView
            originWhitelist={['*']}
            source={{ html: ArticleDetail.content }}
      />
    </View>
  )
}

export default ArticleDetail

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.light.white
    }
})