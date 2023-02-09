import React, {useEffect,useState} from 'react'
const AuthContext= React.createContext();

const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);   
    const [accessToken, setAccessToken] = useState(''); 
    const [refreshToken,setRefreshToken]= useState('');
    const [userData, setUserData] = useState({});
  return (
    <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn,accessToken,setAccessToken,refreshToken,setRefreshToken,userData,setUserData}}>
        {children}
    </AuthContext.Provider>   
  )
}

export {AuthContext, AuthProvider}