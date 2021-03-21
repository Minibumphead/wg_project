import { useState } from 'react';
import { Typography, Paper } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import TodoDetailComponent from './TodoDetailComponent';
import DeleteWarning from './../components/DeleteWarning';

const useStyles = makeStyles((theme) => ({
  todocontainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  secondary: {
    padding: '0px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '25px',
    opacity: 0.5,
    zIndex: '-5',
  },
  paper: {
    padding: '25px',
    marginBottom: '25px',
    backgroundColor: 'orange',
  },

  papercompleted: {
    padding: '25px',
    marginBottom: '25px',
    backgroundColor: 'green',
  },
  button: {
    backgroundColor: '#f6f6f6',
    color: 'black',
    fontSize: '16px',
    fontWeight: '500',
    marginRight: '25px',
    marginBottom: '10px',
    width: '250px',
    borderRadius: '10px',
    lineHeight: '22.2px',
    '&:hover': {
      backgroundColor: 'rgb(230,230,230)',
      fontWeight: 600,
      lineHeight: '22.2px',
    },
  },
  popover: {
    width: '250px',
    padding: '15px',
    borderRadius: '7px',
    backgroundColor: 'green',
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    alignItems: 'center',
  },
}));

export default function UserDetailComponent({
  user,
  users,
  todos,
  setUsers,
  setTodos,
  authUser,
  showDeleteWarning,
  setShowDeleteWarning,
}) {
  const classes = useStyles();

  const [deleteProspect, setDeleteProspect] = useState(false);
  const userTodos = todos.filter((todo) => todo.user === user._id);
  const remainingTodos = userTodos.filter((todo) => todo.completed === false);

  return (
    <>
      <Paper
        className={
          remainingTodos.length === 0 ? classes.papercompleted : classes.paper
        }
      >
        <div className={classes.row}>
          <Typography variant="h6">
            {user.username} (
            {remainingTodos.length === 0 ? 'Keine' : remainingTodos.length}{' '}
            {remainingTodos.length === 1 ? 'Aufgabe' : 'Aufgaben'})
          </Typography>
        </div>

        <div className={classes.todocontainer}>
          {userTodos.map((todo) =>
            !todo.completed ? (
              <TodoDetailComponent
                key={todo._id}
                user={user}
                setTodos={setTodos}
                todo={todo}
                users={users}
                todos={todos}
                setUsers={setUsers}
              />
            ) : null
          )}
        </div>
      </Paper>

      {deleteProspect && showDeleteWarning ? (
        <DeleteWarning
          deleteProspect={deleteProspect}
          setDeleteProspect={setDeleteProspect}
          setShowDeleteWarning={setShowDeleteWarning}
          authUser={authUser}
          setUsers={setUsers}
        />
      ) : null}
    </>
  );
}
