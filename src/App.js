
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import RegisterForm from './forms/RegisterForm'
import LoginForm from './forms/LoginForm'
import Home from './components/Home'
import Admin from './components/Admin'
import AuthRoute from './components/Auth/AuthRoute'


import './App.css';

const App = () => {

  return(
    <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} /> 
          <Route exact path="/login" component={LoginForm}/>
          <Route exact path="/register" component={RegisterForm} />
          <AuthRoute exact path="/admin" component={Admin} />
        </Switch>
    </Router>
  )
}

export default App