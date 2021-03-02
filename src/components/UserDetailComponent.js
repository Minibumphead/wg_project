import './styles.css'
import { deleteUser } from './../services/index'


export default function UserDetailComponent({user, setAllUsers, authUser}) {
    const handleDelete = async(user) => {
       
        // console.log(authUser._id)
        // console.log(user.id)
        if (authUser.id === user._id) {
            alert(`The user ${authUser.username} is logged in and can't be deleted `)
        } else {
            const remainingUsers = await deleteUser(user, authUser)
            setAllUsers(remainingUsers)

        }
      
    }

    return (
        <>
            <div className="user-container">
                <div className="user-detail">ID: {user._id}</div>
                <div className="user-detail">Username: {user.username}</div>
                <div className="user-detail">Email: {user.email}</div>
                <div className="user-detail">Score: {user.score}</div>
                <button onClick={() => handleDelete(user)}>Delete</button>
            </div>
        </>
    )
}