import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useState, useEffect } from 'react';
import CreateTodoForm from './../forms/CreateTodoForm';
import UserDetailComponent from '../components/UserDetailComponent';

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: '5vw',
    marginTop: '40px',
    width: '90vw',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
  },
  secondary: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#000',
    opacity: '0.8',
    zIndex: '5',
  },
  button: {
    height: '50px',
    backgroundColor: '#f6f6f6',
    marginTop: '25px',
    marginBottom: '25px',
    width: '20%',
    fontWeight: 600,
    fontSize: '18px',
    '&:hover': {
      backgroundColor: 'rgb(230,230,230)',
    },
  },
}));

export default function Admin({
  history,
  users,
  todos,
  setUsers,
  setTodos,
  ...props
}) {
  const classes = useStyles();
  const [showTodoForm, setShowTodoForm] = useState(false);

  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem('user'))
  );
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  useEffect(() => {
    async function getData() {
      setAuthUser(authUser);
    }
    getData();
  }, [authUser]);

  return (
    <>
      <Box className={classes.container}>
        <Typography variant="h3">Aufgaben verwalten</Typography>
        {!showTodoForm ? (
          <Button
            onClick={(event) => setShowTodoForm(!showTodoForm)}
            className={classes.button}
          >
            + Aufgabe
          </Button>
        ) : null}
        <CreateTodoForm
          users={users}
          todos={todos}
          setUsers={setUsers}
          setTodos={setTodos}
          showTodoForm={showTodoForm}
          setShowTodoForm={setShowTodoForm}
          history={history}
        />

        {users.map((user) => (
          <UserDetailComponent
            key={user._id}
            showTodoForm
            setShowTodoForm
            showDeleteWarning={showDeleteWarning}
            setShowDeleteWarning={setShowDeleteWarning}
            authUser={authUser}
            user={user}
            setUsers={setUsers}
            setTodos={setTodos}
            users={users}
            todos={todos}
            history={history}
          />
        ))}
      </Box>
    </>
  );
}
