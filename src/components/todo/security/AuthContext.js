import { createContext, useContext, useState } from "react";
import {   loginTodoApi } from "../api/TodoApiService";

// 1 create a Context
// 2 put some state in the context
// 3 share the created context with other components

export const AuthContext = createContext()

export const useAuth = () =>useContext(AuthContext)



export default function AuthProvider({children}){

    // const [number , setNumber] = useState(0)

    const [isAuthenticated , setAuthenticated] = useState(false)
    
    const [userid , setUserid] = useState(0)

    const [token , setToken] = useState(null)

    // function login(username,password){

    //     if( username === "vinay" && password === "vinay@123"){
    //         setAuthenticated(true)
    //         setUserid(1)
    //         return true
    //     }else{
    //         setAuthenticated(false)
    //         setUserid(0)
    //         return false
    //     }
 
    // }

    async function login(username,password){

         const baToken ='Basic ' +window.btoa(username + ":" + password)

        try {

        //const response = await executeBasicAuthenticationService(baToken)

        // const response = await loginTodoApi(username,password)

        const loginData={
            email:username,
            password:password
        }

        const response = await loginTodoApi(loginData)


        if(response.status === 200){
            console.log(response)
            setAuthenticated(true)
            setUserid(response.data)
            setToken(baToken)

            // apiClient.interceptors.request.use(
            //     (config) =>{
            //         console.log("intercepting and adding a token")
            //         config.headers.Authorization= baToken
            //         return config
            //     }
                
            // )

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


    // setInterval(() => setNumber(number+1),10000)

    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout, userid, token}}>
            {children}
        </AuthContext.Provider>

    )
}


// authprovider as a parent