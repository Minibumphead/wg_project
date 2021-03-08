import { useState } from 'react'
import CreateTodoForm from './../forms/CreateTodoForm'





export default function Home({users, todos, setUsers, setTodos, history, ...rest}) {
    const [showTodoForm, setShowTodoForm] = useState(false)
    console.log(users)
    
    return(
        <div className="home-container">
            <button className="addTodoButton" onClick={() => setShowTodoForm(!showTodoForm)}>+ Add Todo</button>
            {showTodoForm? <CreateTodoForm users={users} todos={todos} setUsers={setUsers} setTodos={setTodos} history={history} /> : null }
        </div>
    )
}