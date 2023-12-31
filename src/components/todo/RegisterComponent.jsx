import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerUserApi } from "./api/TodoApiService"

export default function RegisterComponent(){

  const [username, setUsername] = useState("")
  const [email , setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handelUsernameChange(event){
    setUsername(event.target.value)
  }

  function handelEmailChange(event){
    setEmail(event.target.value)
  }

  function handelPasswordChange(event){
    setPassword(event.target.value)
  }

  const [showErrorMessage, setErrorMessage] = useState(false)

  const navigate = useNavigate();

  const userdetails={
            name:username,
            email:email,
            password:password
  }

  async function handelSubmit(){
    if( await registerUserApi(userdetails)){

      navigate(`/login`, { state: { registrationSuccessMessage: 'Registration successful. Please login with your credentials.' } });
        
    }else{
        setErrorMessage(true)
    }
  }

  return (

    <section style={{ height: '100vh', backgroundColor: '#508bfc' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">

                <h3 className="mb-5">Sign in</h3>

                {showErrorMessage && <div className='errorMessage'>Registration Filed Please Provide Vailde Details</div>}

                <div className="form-outline mb-4">
                  
                  <label className="form-label" htmlFor="typeEmailX-2">Name</label>
                  <input type="text" id="typeEmailX-2" className="form-control form-control-lg" value={username} onChange={handelUsernameChange} />

                </div>

                <div className="form-outline mb-4">
                  
                  <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                  <input type="email" id="typeEmailX-2" className="form-control form-control-lg" value={email} onChange={handelEmailChange}/>
                </div>

                <div className="form-outline mb-4">
                  
                  <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                  <input type="password" id="typePasswordX-2" className="form-control form-control-lg" value={password} onChange={handelPasswordChange}/>
                </div>

                <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={handelSubmit}>Save</button>

                <hr className="my-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )

}
  
