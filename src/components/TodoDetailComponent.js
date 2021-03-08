import { deleteTodo } from "../services"
import { useState } from 'react'


export default function TodoDetailComponent({todo, setTodos}) {
    const [showDetails, setShowDetails] = useState(false)
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



    return (
        <>
        <div className="todo-container">
            <div className ="todo-title-row"> 
                <div className="todo-title">{todo.title} </div>
                <button className="todo-button" onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Hide Details' : 'Show Details'}</button>
                <button className="todo-button" onClick={() => handleDelete(todo._id, todo.user)}>Delete todo</button>
            </div>
            {showDetails ? <div className="todo-details">
                <div>Beschreibung: {todo.description}</div>
                <div>Zeitraum: {cleanDate(todo.assignedOn)} - {cleanDate(todo.expiresOn)}</div>
                <div>Punkte: {todo.pointsAwarded}</div>
                <div>geschaetzte Zeit: {todo.timeSpent}min</div>      
            </div> : null}
        </div>
        
        </>
    )
}