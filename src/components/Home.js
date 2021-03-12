import Dashboard from './Dashboard'
export default function Home({users, todos, setUsers, setTodos}) {


    return (
        <>
            {users.map(user => 
            <div key={user._id}>        
                <Dashboard  user={user} todos={todos} setTodos={setTodos} users={users} setUsers={setUsers} />
            </div>)}

        </>

    )
}