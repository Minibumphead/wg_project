import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import RegisterForm from './forms/RegisterForm';
import LoginForm from './forms/LoginForm';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Archive from './pages/Archive';
import AuthRoute from './components/Auth/AuthRoute';

import './App.css';
import { fetchTodos, fetchUsers } from './services/index';

const App = () => {
  const [showTodoForm, setShowTodoForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const allUsers = await fetchUsers();
      const allTodos = await fetchTodos();
      setUsers(allUsers);
      setTodos(allTodos);
    }
    fetchData();
  }, []);

  return (
    <Router>
      <Header />
      <Switch>
        <AuthRoute
          exact
          path="/"
          component={Home}
          todos={todos}
          users={users}
          setTodos={setTodos}
          setUsers={setUsers}
        />
        <Route exact path="/login" component={LoginForm} />
        <Route
          exact
          path="/register"
          render={(props) => (
            <RegisterForm {...props} users={users} setUsers={setUsers} />
          )}
        />
        <AuthRoute
          path="/admin"
          users={users}
          todos={todos}
          setUsers={setUsers}
          setTodos={setTodos}
          showTodoForm={showTodoForm}
          setShowTodoForm={setShowTodoForm}
          component={Admin}
        />
        <Route
          path={`/archiv/:id`}
          render={(props) => (
            <Archive
              {...props}
              users={users}
              todos={todos}
              setUsers={setUsers}
              setTodos={setTodos}
            />
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
