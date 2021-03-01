import { withRouter, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { logout } from './../services/index'
import '../App.css'
function Header({history, ...props}) {
    const [user, setUser] = useState({})
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")))
    },[history.location])

    return(
        <>
            <nav>
                {user ? 
                <ul>
                    <div className="link-wrapper-logo"><Link to="/"><li className="item">HOME</li></Link></div>
                    <div className="link-wrapper"><Link to="/admin"><button className="item">Admin</button></Link></div>
                    <div className="link-wrapper"><Link to="/logout"><button onClick={logout} className="item">Logout</button></Link></div>
                   
                </ul>: 
                
                <ul>
                    <div className="link-wrapper-logo"><Link to="/"><li className="item">HOME</li></Link></div>
                    <div className="link-wrapper"><Link to="/register"><button className="item">Register</button></Link></div>
                    <div className="link-wrapper"><Link to="/login"><button className="item">Login</button></Link></div>


                </ul>}
            </nav>
            <button style={{border: "2px solid black", background: "#999"}} onClick={() => console.log(JSON.parse(localStorage.getItem('user')))}>check user</button>
        </>
    )
}

export default withRouter(Header)