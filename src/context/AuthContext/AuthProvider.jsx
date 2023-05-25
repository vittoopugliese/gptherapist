import { useState } from "react";
import {AuthContext} from "./AuthContext";

// AuthProvider
export const AuthProvider = ({children}) => {
  const [user, setUser] = useState({
    name: 'Vittorio',
    username: 'vitto123',
    avatar: '../../public/unknown.png'
  })
const [isAuth, setIsAuth] = useState(true)




  return (<AuthContext.Provider value={{
    user,
  }}>
    {children}
    </AuthContext.Provider>);
};
