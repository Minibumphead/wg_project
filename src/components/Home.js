import { useState, useEffect } from 'react'




export default function Home(props) {

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