import './styles.css'
import { deleteUser } from './../services/index'
import TodoDetailComponent from './TodoDetailComponent'
import AddTodo from './AddTodo'


export default function UserDetailComponent({user, users, todos, setUsers, setTodos, authUser, history}) {

    const handleDelete = async(user) => {
        console.log(user)
        console.log(authUser)
        if (authUser._id === user._id) {
            alert(`The user ${authUser.username} is logged in and can't be deleted `)
        } else {
            const remainingUsers = await deleteUser(user, authUser)
            setUsers(remainingUsers)
        }
      
    }

    const userTodos = todos.filter(todo => todo.user === user._id)
 


    return (
        <>
       
            <div className="user-container">
                <div className="user-detail">Username: {user.username} 
                <button className="delete-button" onClick={() => handleDelete(user)}>Delete User</button>
                
            </div>
                <div className="user-detail">Email: {user.email}</div>
                <div className="user-detail">Score: {user.score}</div>
                <div className="todos-Container">
                   {userTodos.map(todo => <TodoDetailComponent key={todo._id} setTodos={setTodos} todo={todo} users={users} todos={todos} setUsers={setUsers}/>
                   )}
                   <AddTodo users={users} todos={todos} setUsers={setUsers} setTodos={setTodos} />
                </div>
                
            </div>
 
        </>
    )
}