import {Link,useParams} from 'react-router-dom'
function WelcomeComponent(){
    const {username} = useParams();
    return (
        <div className="welcome">
            <h1>Welcome {username}</h1>
            <div>
                Manage Your Todos <Link to='/todos'>Go here</Link>
            </div>
           
        </div>
    )
}

export default WelcomeComponent