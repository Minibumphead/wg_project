import axios from 'axios'
import { useState, useEffect} from 'react'
import { login } from './../services/index'
import './formstyles.css'


// prop history is passed when you use component = {} within <Route /> component
export default function RegisterForm({ history }) {
    const [user, setUser] = useState({})
    const [formData, setFormdata] = useState({
        username: "",
        email: "",
        password: "",
        confirm: ""
    })
    const handleChange = (event) => {
        if (event.target.name === "username"){
            setFormdata({...formData, username: event.target.value})
        } else if (event.target.name === "email") {
            setFormdata({...formData, email: event.target.value})
        } else if (event.target.name === "password") {
            setFormdata({...formData, password: event.target.value})
        }     else if (event.target.name === "confirm") {
            setFormdata({...formData, confirm: event.target.value})
        }       
    }

    const handleSubmit = async(event) => {
            try {
                event.preventDefault()
                const loginData = {
                    username: formData.username,
                    password: formData.password
                }
                const {data} = await axios.post("http://localhost:5000/users", formData)
                localStorage.setItem("user", JSON.stringify(data))
                setFormdata({
                    username: "",
                    email: "",
                    password: "",
                    confirm: ""
                     })
                console.log('new user created')
                history.push('/')
                
            } catch (error) {
                console.log(error)
                console.log('try not successful')
            }
    }

    // useEffect(() => {
    //     setUser(JSON.parse(localStorage.getItem("user")))
    // }, [history.location])


    return (
        <>

           <div className="form-container-register">
            <form className="form-inner" onSubmit={handleSubmit}>
                    <h3 className="form-title">Sign up here</h3>
                    <input className="form-input" name="username" type="text" value={formData.username} onChange={handleChange} placeholder="username"></input>
                    <input className="form-input" name="email" type="text" value={formData.email} onChange={handleChange} placeholder="email"></input>
                    <input className="form-input" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="password"></input>
                    <input className="form-input" name="confirm" type="password" value={formData.confirm} onChange={handleChange} placeholder="confirm"></input>
                    <button className="submit-button" type="submit"> Register </button>
                </form>
           </div>
        </>
    )
}