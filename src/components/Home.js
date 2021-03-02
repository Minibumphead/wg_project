import { useState, useEffect } from 'react'




export default function Home({history}) {

    const [user, setUser] = useState({})
    useEffect(() => 
        {
        setUser(JSON.parse(localStorage.getItem("user")))},[]
       )


    return(
        <div>
            {user ? <div>yes</div> : <div>no</div>}
        </div>
    )
}