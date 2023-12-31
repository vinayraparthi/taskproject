import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './security/AuthContext'
function LoginComponent(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    // const [showSuccessMessage, setSuccessMessage] = useState(false)
    const [showErrorMessage, setErrorMessage] = useState(false)
    const navigate = useNavigate();
    const authContext = useAuth()
    const location = useLocation();

    function handelUsernameChange(event){
        setUsername(event.target.value);
    }
    function handelPasswordChange(event){
        console.log(event.target.value);
        setPassword(event.target.value);
    }
    async function handelSubmit(){
        if( await authContext.login(username, password)){
            navigate(`/welcome/${username}`)
            
        }else{
            setErrorMessage(true)
        }
    }
    // function SuccessMessageComponent(){
    //     if(showSuccessMessage){
    //         return <div className='SuccessMessage'>Authentication Successfully</div>
    //     }
    //     return null
    // }
    
    // function ErrorMessageComponent(){
    //     if(showErrorMessage){
    //     return <div className='errorMessage'>Authentication Failed. Please Check Your Credentials.</div>
    //     }
    //     return null
    // }
    return (

<section style={{ height: '100vh', backgroundColor: '#508bfc' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">

                <h3 className="mb-5">Log in</h3>
                {showErrorMessage && <div className='errorMessage'>Authentication Failed. Please Check Your Credentials.</div>}
                {location.state && location.state.registrationSuccessMessage && (
                  <div className="successMessage">
                    {location.state.registrationSuccessMessage}
                  </div>
                )}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                  <input type="email" id="typeEmailX-2" className="form-control form-control-lg"value={username} onChange={handelUsernameChange}/>
                  
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                  <input type="password" id="typePasswordX-2" className="form-control form-control-lg" value={password} onChange={handelPasswordChange}/>
                  
                </div>
                <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={handelSubmit}>Login</button>

                <hr className="my-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
        
    )
}

export default LoginComponent