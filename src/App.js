import {useState, useEffect} from 'react'
import { BrowserRouter as Router, Link, Route} from 'react-router-dom'

import Header from './components/Header'
import RegisterForm from './forms/RegisterForm'
import LoginForm from './forms/LoginForm'


import './App.css';

const App = () => {


  return(
    <Router>
     
        <Header />
        <Route exact path="/"><div>Home</div></Route>
        <Route exact path="/login" component={LoginForm}/>
        <Route exact path="/register" component={RegisterForm} />
    </Router>
  )
}

export default App