import { deleteTodo, updateTodo, updateUser } from "../services"
import { useState, useEffect, useRef } from 'react'
import UpdateTodoForm from "../forms/UpdateTodoForm"



export default function TodoDetailComponent({user, todo, todos, setTodos, users, setUsers}) {
    const [showDetails, setShowDetails] = useState(false)
    const [showTodoUpdateForm, setShowTodoUpdateForm] = useState(false)
    const isMountedValue = useRef(1)

    

    /// understand this cleanup function
    useEffect(() => {
        isMountedValue.current = 1
        return () => {isMountedValue.current = 0}
    })

    const updateState = (callback) => {
        if (isMountedValue.current){
            callback()
        }
    }

    const handleDelete = async(todoId, userId) => {
        const remainingTodos = await deleteTodo(todoId)
        setTodos(remainingTodos)
    }

    const cleanDate = (date) => {
        if (date) {
      
            const segments = date.split('-')
            // const year = segments[2]
            const readableDate = `${segments[2].slice(0,2)}.${segments[1]}`
            return readableDate
        }
        return null
        
       
    }

  

    const handleEdit = () => {
        setShowTodoUpdateForm(!showTodoUpdateForm)
    }

    const toggleComplete = async() => {

        const toggledIdCompleted = await updateTodo(todo, todo._id)
        if (toggledIdCompleted === true){
            const updatedUser = await updateUser(user._id, {oldScore: user.score, points: todo.pointsAwarded})
        }
       

        const otherTodos = todos.filter(todo => todo._id !== toggledIdCompleted._id)
        setTodos([...otherTodos, toggledIdCompleted])

    }

    return (
        <>
        <div className="todo-container">
            <div className ="todo-title-row"> 
                <div className="todo-title">{todo.title}</div>
                <button className="todo-button" onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Hide Details' : 'Show Details'}</button>
                <button className="todo-button" onClick={() => handleDelete(todo._id, todo.user)}>Delete todo</button>
            </div>
            {showDetails ? <div className="todo-details">
                <div>Beschreibung: {todo.description}</div>
                <div>Zeitraum: {cleanDate(todo.assignedOn)} - {cleanDate(todo.expiresOn)}</div>
                <div>Punkte: {todo.pointsAwarded}</div>
                <div>geschaetzte Zeit: {todo.timeSpent}min</div>    
                <div>Zustaendige Person: {todo.user}</div>
                <button onClick={() => toggleComplete()}className={todo.completed ? 'isCompleted' : 'isNotCompleted'}>{todo.completed? 'Erledigt' : 'Nicht erledigt'}</button>  
                <button className="todo-button" onClick={() => updateState(() => handleEdit(todo))}> Bearbeiten</button> 
                <UpdateTodoForm 
                    user={user} 
                    todo={todo} 
                    todos={todos} 
                    users={users} 
                    setUsers={setUsers} 
                    setTodos={setTodos} 
                    showTodoUpdateForm={showTodoUpdateForm} 
                    setShowTodoUpdateForm={setShowTodoUpdateForm} />
            </div> : null}
           
        </div>
        
        
        </>
    )
}