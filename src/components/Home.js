export default function Home({users}) {

    return (
        <>
            {users.map(user => <div>

                <div>{user.username} hat {user.score} Punkte gesammelt</div>
            </div>)}

        </>

    )
}