import { apiClient } from "./ApiClint";


export const loginTodoApi 
= (loginData) => {
    return apiClient.post(`/auth/login`, loginData)
}
      
export const registerUserApi= (userdetails) => {

   return apiClient.post(`/auth/signup`,userdetails)
  
}