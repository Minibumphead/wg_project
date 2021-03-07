
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import RegisterForm from './forms/RegisterForm'
import LoginForm from './forms/LoginForm'
import Home from './components/Home'
import Admin from './components/Admin'
import AuthRoute from './components/Auth/AuthRoute'


import './App.css';
import { fetchTodos, fetchUsers } from './services'


const App = () => {
  const [date, startDate] = useState(new Date())
  const [users, setUsers] = useState([])
  const [todos, setTodos] = useState([])
  useEffect(() =>{
    async function fetchData(){
      const allUsers = await fetchUsers()
      const allTodos = await fetchTodos()
      setUsers(allUsers)
      setTodos(allTodos)
    }
    fetchData()
  },[])

  
  
  return(
    <Router>

        <Header />
        <Switch>
          <Route exact path="/" render={props => <Home {...props} todos={todos} users={users} />} /> 
          <Route exact path="/login" component={LoginForm}/>
          <Route exact path="/register" component={RegisterForm} />
          <AuthRoute exact path="/admin" component={Admin} />
        </Switch>
    </Router>
  )
}

export default App