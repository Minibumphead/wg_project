import {useState, useEffect } from 'react'
import {fetchData } from './../services/index'
import UserDetailComponent from './../components/UserDetailComponent'

export default function Admin({history}) {

    const [authUser,setAuthUser] = useState(JSON.parse(localStorage.getItem("user")))
    const [allUsers, setAllUsers] = useState([])
    
    
    useEffect(() => 
        {async function getData(){   
            const users = await fetchData()
            setAuthUser(authUser)
            setAllUsers(users)}
        getData()
        },[authUser])

    return (
        <div>
            <h1>Admin Site</h1>
            {allUsers.map(user => <UserDetailComponent key={user._id} authUser={authUser} user = {user} setAllUsers={setAllUsers} allUsers={allUsers} history={history}/>)}
        </div>
        )
}