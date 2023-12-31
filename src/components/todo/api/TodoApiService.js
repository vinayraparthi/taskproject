import axios from 'axios'

export const apiClient = axios.create(
    {
        baseURL:'http://localhost:8081/api'
    }
);



export const loginTodoApi = (loginData) => {
    // Use the `data` property to pass the request body
    return apiClient.post(`/auth/login`, loginData, {
      headers: {
        'Content-Type': 'application/json', // Specify the content type as JSON
      },
    });
  };

export const registerUserApi= (userdetails) => {

  return apiClient.post(`/auth/register`,userdetails)
  
}

export const retriveAllTodosForUseridApi
= (userid) => apiClient.get(`/${userid}/tasks`)

export const deleteTodoApi
= (userid,taskid) => apiClient.delete(`/${userid}/task/${taskid}`)

export const retriveTodoApi
= (userid,taskid) => apiClient.get(`/${userid}/task/${taskid}`)

export const updateTodoApi
= (userid,taskid,taskData) => apiClient.post(`/${userid}/task/${taskid}`,taskData)

export const AddTodoApi
= (userid,taskData) => apiClient.post(`/${userid}/tasks`,taskData)
    


