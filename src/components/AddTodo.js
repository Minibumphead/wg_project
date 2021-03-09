import { useState } from 'react'
import CreateTodoForm from '../forms/CreateTodoForm'





export default function AddTodo({users, todos, setUsers, setTodos, history, ...rest}) {
    const [showTodoForm, setShowTodoForm] = useState(false)

    
    return(
        <div className="home-container">
            <button className="addTodoButton" onClick={() => setShowTodoForm(!showTodoForm)}>+ Add Todo</button>
            {showTodoForm ? <CreateTodoForm users={users} todos={todos} setUsers={setUsers} setTodos={setTodos} showTodoForm={showTodoForm} setShowTodoForm={setShowTodoForm} history={history} /> : null }
        </div>
    )
}