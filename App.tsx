import React, { useCallback } from 'react';
import RootScreen from './Screens/RootScreen';
import { AuthProvider } from './Context/AuthContext';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function App(){
  const [fontsLoaded] = useFonts({
    'Poppins-Black': require('./Constants/Fonts/Poppins-Black.ttf'),
    'Poppins-BlackItalic': require('./Constants/Fonts/Poppins-BlackItalic.ttf'),
    'Poppins-Bold': require('./Constants/Fonts/Poppins-Bold.ttf'),
    'Poppins-BoldItalic': require('./Constants/Fonts/Poppins-BoldItalic.ttf'),
    'Poppins-ExtraBold': require('./Constants/Fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraBoldItalic': require('./Constants/Fonts/Poppins-ExtraBoldItalic.ttf'),
    'Poppins-ExtraLight.ttf': require('./Constants/Fonts/Poppins-ExtraLight.ttf'),
    'Poppins-ExtraLightItalic': require('./Constants/Fonts/Poppins-ExtraLightItalic.ttf'),
    'Poppins-Italic': require('./Constants/Fonts/Poppins-Italic.ttf'),
    'Poppins-Light': require('./Constants/Fonts/Poppins-Light.ttf'),
    'Poppins-LightItalic': require('./Constants/Fonts/Poppins-LightItalic.ttf'),
    'Poppins-Medium': require('./Constants/Fonts/Poppins-Medium.ttf'),
    'Poppins-MediumItalic': require('./Constants/Fonts/Poppins-MediumItalic.ttf'),
    'Poppins-Regular': require('./Constants/Fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./Constants/Fonts/Poppins-SemiBold.ttf'),
    'Poppins-SemiBoldItalic': require('./Constants/Fonts/Poppins-SemiBoldItalic.ttf'),
    'Poppins-Thin': require('./Constants/Fonts/Poppins-Thin.ttf'),
    'Poppins-ThinItalic': require('./Constants/Fonts/Poppins-ThinItalic.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return(
    <AuthProvider>
      <View style={{flex:1}} onLayout={onLayoutRootView}>
      <RootScreen/>
     </View>
    </AuthProvider>
  )
}