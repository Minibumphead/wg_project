import { deleteTodo } from "../services"
import { useState } from 'react'



export default function TodoDetailComponent({todo, todos, setTodos, users, setUsers}) {
    const [showDetails, setShowDetails] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)

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

    const handleSave = (todo) => {
        const updatedTodo = {
            ...todo,
            completed: isCompleted
        }
        // write some code that updates todo
        console.log(updatedTodo)
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
                <button onClick={() => setIsCompleted(!isCompleted)}className={isCompleted ? 'isCompleted' : 'isNotCompleted'}>{isCompleted? 'Erledigt' : 'Nicht erledigt'}</button>  
                <button className="todo-button" onClick={() => handleSave(todo)}> Speichern</button>  
            </div> : null}
           
        </div>
        
        
        </>
    )
}