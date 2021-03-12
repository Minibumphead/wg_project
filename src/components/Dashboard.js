import TodoDetailComponent from './TodoDetailComponent'

export default function Dashboard({user, todos, users, setUsers, setTodos}){


    const userTodos = todos.filter(todo => todo.user === user._id)
    console.log(userTodos)
    const completedTodos = userTodos.filter(todo => todo.completed === true)
    const remainingTodos = userTodos.filter(todo => todo.completed === false)
    
    const calcScore = (completedTodos) => {
        let i =0
        var oldScore = 0
        for (i=0; i<completedTodos.length; i++){
            oldScore += completedTodos[i].pointsAwarded
        }
        return oldScore
        
    }


    return (
        <>
            <div>Dashboard</div>
            <div>
                <div>User {user.username}</div>
                <div> Todos in Progress: {remainingTodos.length}</div>
                <div>Todos completed: {completedTodos.length}</div>
                <div>points Collected: {calcScore(completedTodos)}</div>
                {completedTodos.map(todo => <TodoDetailComponent 
                                                                key={todo._id} 
                                                                user={user} 
                                                                setTodos={setTodos} 
                                                                todo={todo} 
                                                                users={users} 
                                                                todos={todos} 
                                                                setUsers={setUsers} />)}
         
            </div>
        </>
    )
}