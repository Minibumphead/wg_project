import { useState, useEffect } from 'react'

import UserDetailComponent from './../components/UserDetailComponent'
import './styles.css'

export default function Admin({history, users, todos, setUsers, setTodos, ...props}) {

    const [authUser,setAuthUser] = useState(JSON.parse(localStorage.getItem("user")))
    
    useEffect(() => 
        {async function getData(){   
            setAuthUser(authUser)}
        getData()
        },[authUser])


    return (
        <div>
            <h1>Admin Site</h1>
            <div className="base-container">
             {users.map(user => <UserDetailComponent key={user._id} authUser={authUser} user = {user} setUsers={setUsers} setTodos={setTodos} users={users} todos={todos} history={history}/>)}
            </div>
          
        </div>
        )
}