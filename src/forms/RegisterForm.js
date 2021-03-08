import axios from 'axios'
import { useState } from 'react'
import Joi from 'joi'

import './formstyles.css'


// prop history is passed when you use component = {} within <Route /> component
export default function RegisterForm({users, setUsers, history }) {
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
    
    const validateForm = (formData) => {

        const schema = Joi.object({
            username: Joi.string().alphanum().min(1).max(20),
            email: Joi.any(),
            password: Joi.string().min(3).max(10),
            confirm: Joi.ref('password')
        })
        try {
            const {error} = schema.validate({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                confirm: formData.confirm,
            })
            if (error) throw error
        } catch (error) {
            alert(error.message)
            return error
        }
    }
    const handleSubmit = async(event) => {
                event.preventDefault()
                const error = validateForm(formData)
                try {
                        if (error) throw error
                        const response = await axios.post("http://localhost:5000/users", formData)
                        localStorage.setItem("user", JSON.stringify(response.data))
                        setUsers([...users, response.data ])
                        history.push('/')

                    } catch(error){
                        console.log(error.message)
                    }
                } 
    

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