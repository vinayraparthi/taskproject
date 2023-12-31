import {Link} from 'react-router-dom'
import { useAuth } from './security/AuthContext'

function HeaderComponent(){

    // const authcontext = useContext(AuthContext)
    

    const authContext = useAuth()

    const isAuthenticated = authContext.isAuthenticated

    console.log(authContext);

    function logout(){
        authContext.logout()
    }

    // console.log(authContext.number);
    return (
        <header className='border-bottom border-light border-5 mb-5 p-2'>
        <div className="container">
            <div className='row'>
                <nav className='navbar navbar-expand-lg'>
                <a className="navbar-brand ms-2 fs-2 fw-bold text-black" 
                href="https://www.linkedin.com/in/vinay-kumar-raparthi/">Todo Management</a>
                <div className="collapse navbar-collapse">
                    <ul className='navbar-nav'>
                    <li className='nav-item fs-5' >
                        { isAuthenticated && 
                        <Link className='nav-link' to="/welcome/vinay">Home</Link>}
                        
                        </li>
                    <li className='nav-item fs-5' >
                        { isAuthenticated && 
                        <Link className='nav-link' to="/todos">Todos</Link>}
                        </li>
                    </ul>
                </div>
                <ul className='navbar-nav'>
                <li className='nav-item' >
                    {isAuthenticated && 
                    <Link className='nav-link' to="/logout" onClick={logout}>Logout</Link>
                    }
                    </li>
                <li className='nav-item' >
                   {!isAuthenticated && 
                    <Link className='nav-link' to="/login">Login</Link>
                    }
                    </li>
                <li className='nav-item' >
                    {!isAuthenticated && 
                    <Link className='nav-link' to="/register">Register</Link>
                    }
                    
                    </li>
                </ul>
                </nav>
            </div> 
        </div>
    </header>
        
    )
}

export default HeaderComponent