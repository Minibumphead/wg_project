import { useState, useEffect } from 'react'
import Todo from './Todo'
import CreateTodoForm from './../forms/CreateTodoForm'





export default function Home(props) {

    const [showTodoForm, setShowTodoForm] = useState(false)
    const [user, setUser] = useState({})
    useEffect(() => 
        {
        setUser(JSON.parse(localStorage.getItem("user")))},[]
       )
    return(
        <div className="home-container">
            <button className="addTodoButton" onClick={() => setShowTodoForm(!showTodoForm)}>+ Add Todo</button>
            {showTodoForm? <CreateTodoForm users={props.users}/> : null }
        </div>
    )
}