
import { Route, Redirect } from 'react-router-dom'


export default function AuthRoute({component: Component, ...rest}) {
    console.log('redered auth ROute')
    let isAuth = true

    const auth = JSON.parse(localStorage.getItem("user"))
    console.log(auth)
    if (!auth){
        isAuth = false
    }




    return (
        <Route 
            {...rest}
            render={(props) => 
                isAuth === true ? (<Component {...props} />) : (<Redirect to="/login" />)
            }

        />
    )
}