
import { useState } from 'react'
import { login } from './../services/index'
import './formstyles.css'



export default function LoginForm({history}) {

    const [formData, setFormdata] = useState({
        username: "",
<<<<<<< HEAD
=======

>>>>>>> main
        password: ""

    })

    const handleChange = (event) => {
        if (event.target.name === "username"){
            setFormdata({...formData, username: event.target.value})
        } else if (event.target.name === "password") {
            setFormdata({...formData, password: event.target.value})
        }
    }

    const handleSubmit = async(event) => {
        console.log(formData)
        event.preventDefault()
<<<<<<< HEAD
        const user = await login(formData)


        history.push('/')
        setFormdata({
            username: "",
            email: "",
            password: "",
            confirm: ""
        })
=======
        
            if (await login(formData)){
                history.push('/')
>>>>>>> main
    }
}


    return (
        <>

           <div className="form-container-login">
            <form className="form-inner" onSubmit={handleSubmit}>
                    <h3 className="form-title">Login up here</h3>
                    <input className="form-input" name="username" type="text" value={formData.username} onChange={handleChange} placeholder="username"></input>
                    
                    <input className="form-input" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="password"></input>
                    
                    <button className="submit-button" type="submit"> Log In </button>
                </form>
           </div>
        </>
    )
}