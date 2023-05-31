import {useEffect, useState} from "react";
import {AuthContext} from "./AuthContext";

// AuthProvider
export const AuthProvider = ({children, conversations}) => {
  const [isAuth, setIsAuth] = useState(true);
  const [user, setUser] = useState({
    name: "Vittorio",
    username: "vitto123",
    avatar: "unknown.png",
    conversations: [],
  });

  // useEffect(() => {
  //   setUser({...user, conversations: conversations});
  //   console.log(user);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [conversations]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth
      }}>
      {children}
    </AuthContext.Provider>
  );
};
