import { deleteTodo } from "../services"
import { useState } from 'react'

export default function TodoDetailComponent({todo, setTodos}) {

    const handleDelete = async(todoId, userId) => {
        const remainingTodos = await deleteTodo(todoId)
        setTodos(remainingTodos)
    }

    return (
        <>
        <div className="todo-details">
           <div className ="todo-title-row"> {todo.title}<button className="todo-delete" onClick={() => handleDelete(todo._id, todo.user)}>Delete todo</button></div>
           <div className="todo-description">{todo.description}</div>
        </div>
        
        </>
    )
}