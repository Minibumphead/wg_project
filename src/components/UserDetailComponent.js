import './styles.css'
import { useEffect, useState } from 'react'
import { deleteUser, getUserTodos } from './../services/index'
import TodoDetailComponent from './TodoDetailComponent'
import AddTodo from './AddTodo'


export default function UserDetailComponent({user, users, todos, setUsers, setTodos, authUser, history}) {

    const handleDelete = async(user) => {
        if (authUser._id === user._id) {

            alert(`The user ${authUser.username} is logged in and can't be deleted `)
        } else {
            const remainingUsers = await deleteUser(user, authUser)
            setUsers(remainingUsers)
        }
      
    }

    // create an endpoint that will get user Todos specifically

    const userTodos = todos.filter(todo => todo.user === user._id)
    return (
        <>
            
            <div className="user-container">
                <div className="user-detail">Username: {user.username} 
                <button className="delete-button" onClick={() => {
                     handleDelete(user)

                }}>Delete User</button>
                
            </div>
                <div className="user-detail">Email: {user.email}</div>
                <div className="user-detail">Score: {user.score}</div>
                <div className="todos-Container">
                   {userTodos.map(todo => <TodoDetailComponent key={todo._id} user={user} setTodos={setTodos} todo={todo} users={users} todos={todos} setUsers={setUsers}/>
                   )}
                   <AddTodo user={user} users={users} todos={todos} setUsers={setUsers} setTodos={setTodos} />
                </div>
                
            </div>
 
        </>
    )
}