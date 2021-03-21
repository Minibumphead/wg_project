import { Route, Redirect } from 'react-router-dom';

export default function AuthRoute({
  component: Component,
  users,
  setUsers,
  todos,
  setTodos,
  ...rest
}) {
  let isAuth = false;

  const auth = JSON.parse(localStorage.getItem('user'));

  if (auth) {
    isAuth = true;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth === true ? (
          <Component
            {...props}
            users={users}
            todos={todos}
            setUsers={setUsers}
            setTodos={setTodos}
          />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
