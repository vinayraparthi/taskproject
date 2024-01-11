import { createContext, useContext, useState } from "react";
import {   loginTodoApi } from "../api/Authentication"
import { jwtDecode as jwt_decode } from "jwt-decode";
import { apiClient } from "../api/ApiClint";

// 1 create a Context
// 2 put some state in the context
// 3 share the created context with other components

export const AuthContext = createContext()

export const useAuth = () =>useContext(AuthContext)



export default function AuthProvider({children}){

    const [isAuthenticated , setAuthenticated] = useState(false)
    
    const [userid , setUserid] = useState(0)

    const [token , setToken] = useState(null)

    const [username , setUsername] = useState(null)


    async function login(username,password){
        try {

        const loginData={
            email:username,
            password:password
        }

        const response = await loginTodoApi(loginData)
        console.log(response.data)

        if(response.data.token){

            const jwtToken ='Bearer ' + response.data.token

            const decodedToken = jwt_decode(response.data.token);
            console.log(decodedToken)
            setAuthenticated(true)
            setUserid(decodedToken.userId)
            setToken(jwtToken)
            setUsername(decodedToken.username)

            apiClient.interceptors.request.use(
                (config) =>{
                    console.log("intercepting and adding a token")
                    config.headers.Authorization= jwtToken
                    return config
                }
                
            )

            return true
        }else{
            logout()
            return false
        }

        } catch(error){
            logout()
            return false
        } 
    }
    function logout(){
        setAuthenticated(false)
        setUserid(0)
        setToken(null)
    }
    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout, userid, token,username}}>
            {children}
        </AuthContext.Provider>

    )
}
// authprovider as a parent