import { deleteTodo, saveTodo } from "../services"
import { useState } from 'react'
import UpdateTodoForm from "../forms/UpdateTodoForm"



export default function TodoDetailComponent({todo, todos, setTodos, users, setUsers}) {
    const [showDetails, setShowDetails] = useState(false)
    const [showTodoUpdateForm, setShowTodoUpdateForm] = useState(false)
    const [isCompleted, setIsCompleted] = useState(todo.completed)
    const [oldFormData] = useState(todo)


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

  

    const handleEdit = (todo) => {
        setShowTodoUpdateForm(!showTodoUpdateForm)

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
                <button onClick={async() => {
                    setIsCompleted(!isCompleted)
                    const updatedTodo = {
                        ...todo,
                        completed: !isCompleted
                    }
       
                    const toggledIsCompleted = await saveTodo(updatedTodo)
                    const otherTodos = todos.filter(todo => todo._id !== updatedTodo._id)
                    setTodos([...otherTodos, toggledIsCompleted])
     
                }}className={todo.completed ? 'isCompleted' : 'isNotCompleted'}>{todo.completed? 'Erledigt' : 'Nicht erledigt'}</button>  
                <button className="todo-button" onClick={() => handleEdit(todo)}> Bearbeiten</button> 
                <UpdateTodoForm oldFormData={oldFormData} todo={todo} todos={todos} users={users} setUsers={setUsers} setTodos={setTodos} showTodoUpdateForm={showTodoUpdateForm} 
                                setShowTodoUpdateForm={setShowTodoUpdateForm} />
            </div> : null}
           
        </div>
        
        
        </>
    )
}