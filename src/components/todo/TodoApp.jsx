
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import LogOutComponent from './LogoutComponent'
import LoginComponent from './LoginComponent'
import HeaderComponent from './HeaderComponent'
import WelcomeComponent from './WelcomeComponent'
import ErrorComponent from './ErrorComponent'
import ListTodoComponent from './ListTodoComponent'
import TodoComponent from './TodoComponent'
import AuthProvider, { useAuth } from './security/AuthContext'
import './TodoApp.css'
import RegisterComponent from './RegisterComponent'
import AddNewTodoComponent from './AddNewTodoComponent'

function AuthenticationRoute({children}){
    const authContext = useAuth()
    if(authContext.isAuthenticated){
        return children
    }
    return <Navigate to="/"/> 
}

export default function TodoApp(){
    return(
        <div className="TodoApp" style={{ minHeight: '100vh' }}>
            <AuthProvider>
                <BrowserRouter>
                <HeaderComponent/>
                <Routes>
                    <Route path='/' element={<LoginComponent/>}/>
                    <Route path='/login' element={<LoginComponent/>}/>
                    <Route path='/register' element={<RegisterComponent/>}/>

                    <Route path='/welcome/:username' element={
                        <AuthenticationRoute>
                            <WelcomeComponent/>
                        </AuthenticationRoute>
                    }/>
                    <Route path='/todos' element={
                        <AuthenticationRoute>
                            <ListTodoComponent/>
                        </AuthenticationRoute>
                    }/>

                    <Route path='/todo/:id' element={
                        <AuthenticationRoute>
                            <TodoComponent/>
                        </AuthenticationRoute>
                    }/>

                    <Route path='/logout' element={
                    <AuthenticationRoute>
                        <LogOutComponent/>
                    </AuthenticationRoute>
                    }/>

                    <Route path='/addtodo' element={
                        <AuthenticationRoute>
                            <AddNewTodoComponent/>
                        </AuthenticationRoute>
                    }/>
                    

                    <Route path='/*' element={<ErrorComponent/>}/>
                    
                </Routes>
                
                </BrowserRouter>
            </AuthProvider>
            
        </div>
    )
}





