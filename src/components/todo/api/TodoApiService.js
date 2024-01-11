import { apiClient } from "./ApiClint";

export const retriveAllTodosForUseridApi
= (userid) => apiClient.get(`/user/${userid}/tasks`)

export const deleteTodoApi
= (userid,taskid) => apiClient.delete(`/user/${userid}/task/${taskid}`)

export const retriveTodoApi
= (userid,taskid) => apiClient.get(`/user/${userid}/task/${taskid}`)

export const updateTodoApi
= (userid,taskid,taskData) => apiClient.put(`/user/${userid}/task/${taskid}`,taskData)

export const AddTodoApi
= (userid,taskData) => apiClient.post(`/user/${userid}/tasks`,taskData)
    


