import React from 'react';
import RootScreen from './Screens/RootScreen';
import { AuthProvider } from './Context/AuthContext';

export default function App(){
  return(
    <AuthProvider>
      <RootScreen/>
    </AuthProvider>
  )
}