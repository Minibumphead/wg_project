import './styles.css'
import { deleteUser } from './../services/index'
import TodoDetailComponent from './TodoDetailComponent'


export default function UserDetailComponent({user, users, todos, setUsers, setTodos, authUser, history}) {

    const handleDelete = async(user) => {
        if (authUser.id === user._id) {
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
                <div className="user-detail">Username: {user.username}</div>
                <div className="user-detail">Email: {user.email}</div>
                <div className="user-detail">Score: {user.score}</div>
                <div className="todos-Container">
                   {userTodos.map(todo => <TodoDetailComponent key={todo._id} setTodos={setTodos} todo={todo} />
                   )}
                </div>
                <button onClick={() => handleDelete(user)}>Delete User</button>
            </div>
 
        </>
    )
}