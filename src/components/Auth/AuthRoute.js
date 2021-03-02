
import { Route, Redirect } from 'react-router-dom'


export default function AuthRoute({component: Component, ...rest}) {
    let isAuth = false

    const auth = JSON.parse(localStorage.getItem("user"))
    
    if(auth) {
        isAuth = true
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