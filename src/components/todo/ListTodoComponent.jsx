import { useEffect, useState } from "react"
import { deleteTodoApi, retriveAllTodosForUseridApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"

function ListTodoComponent(){

    const [todos,setTodos] = useState([])

    const [message,setMessage] = useState(null)

    const authContext = useAuth()

    const navigate = useNavigate()

    const userid = authContext.userid

    useEffect(
        () => {
            refreshTodos()
        }, []
    )

function refreshTodos(){
    retriveAllTodosForUseridApi(userid)
    .then(response => {
        console.log(response.data)
        setTodos(response.data)
    }
    )
    .catch(error => console.log(error))
}

function deleteTodo(id){
    console.log("deleteTodoClicked" ,id)
    deleteTodoApi(userid,id)
    .then(
        () =>{
            setMessage(`Task Was Deleted with Id = ${id} is successful`)
            refreshTodos()
        }

    )
    .catch(error => console.log(error))
}

function UpdateTodo(id){
    console.log(id)
    navigate(`/todo/${id}`)
}

function addNewTodo(){
    navigate('/addtodo')
}
    return (
        <div className="container" style={{ height: '73vh'}}>
            <h1>Thing you Want to Do!</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className='table'>
                    <thead>
                        <tr>

                            <th>Description</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.taskname}</td>
                                        <td><button className="btn btn-warning" onClick=
                                            {() =>deleteTodo(todo.id)}>Delete</button></td>
                                        <td><button className="btn btn-success" onClick=
                                            {() =>UpdateTodo(todo.id)}>Update</button></td>
                                    </tr>

                                    )
                                )

                        }
                    </tbody>
                </table>
            </div>

            <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Task</div>
            
        </div>
    )
}

export default ListTodoComponent