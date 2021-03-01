
import { BrowserRouter as Router, Route} from 'react-router-dom'

import Header from './components/Header'
import RegisterForm from './forms/RegisterForm'
import LoginForm from './forms/LoginForm'
import Home from './components/Home'
import Admin from './components/Admin'


import './App.css';

const App = () => {


  return(
    <Router>
     
        <Header />
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={LoginForm}/>
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/admin" component={Admin}/>
    </Router>
  )
}

export default App