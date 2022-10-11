
import {useState, createContext, useContext,} from "react";
const AuthContext = createContext();

const AuthProvider = ({children})=>{
// user login olan kullanıcın datasını tutucak...    
const [user,setUser]=useState(null);
// giriş yapan kullanıcı varsa loggedIn true değer alıcak...
const[loggedIn,setLoggedIn]=useState(false);

const login= (data)=>{
    setLoggedIn(true);
    setUser(data)
    
};

console.log("çalıştı")
    console.log(loggedIn)
  console.log(user)

const values = {
    loggedIn,
    user,
    login,
};

return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
};

const useAuth =()=> useContext(AuthContext);
export {AuthProvider,useAuth}