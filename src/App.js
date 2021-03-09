
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import RegisterForm from './forms/RegisterForm'
import LoginForm from './forms/LoginForm'
import Admin from './components/Admin'
import AuthRoute from './components/Auth/AuthRoute'


import './App.css';
import { fetchTodos, fetchUsers } from './services'


const App = () => {
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
          
          <Route exact path="/login" component={LoginForm}/>
          <Route exact path="/register" render={props => <RegisterForm {...props} users={users} setUsers={setUsers} />} />
          <AuthRoute path="/admin" users={users} todos={todos} setUsers={setUsers} setTodos={setTodos} component={Admin} />
        </Switch>
    </Router>
  )
}

export default App