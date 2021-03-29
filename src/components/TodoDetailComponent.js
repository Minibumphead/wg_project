import { Container, Button, Typography } from '@material-ui/core';
import { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/core/styles';

import { deleteTodo, updateTodo } from '../services';
import { useEffect, useRef } from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: '5px',
    background: '#f6f6f6',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
    padding: '15px',
    border: '3px solid black',
    margin: '2px',
    minWidth: '25%',
    maxWidth: '33%',
  },
  buttonbox: {
    flex: 1,
    width: '80%',
    marginTop: '10px',
  },
}));

export default function TodoDetailComponent({
  user,
  todo,
  setTodos,
  setUsers,
}) {
  const [updatedTime, setUpdatedTime] = useState(0);
  const [editTime, setEditTime] = useState(false);
  const classes = useStyles();

  const isMountedValue = useRef(1);

  /// understand this cleanup function
  useEffect(() => {
    isMountedValue.current = 1;
    return () => {
      isMountedValue.current = 0;
    };
  });

  const handleDelete = async (todoId, userId) => {
    const remainingTodos = await deleteTodo(todoId);
    setTodos(remainingTodos);
  };

  const cleanDate = (date) => {
    if (date) {
      const segments = date.split('-');
      // const year = segments[2]
      const readableDate = `${segments[2].slice(0, 2)}.${segments[1]}`;
      return readableDate;
    }
    return;
  };

  const toggleComplete = async (todo) => {
    const newTodo = { ...todo, completed: true, completedOn: new Date() };
    const response = await updateTodo(newTodo, todo._id);
    setTodos(response);
  };

  const updateTime = async (todo) => {
    const newTodo = { ...todo, timeSpent: updatedTime };
    const response = await updateTodo(newTodo, todo._id);
    console.log(response);
    setTodos(response);
    setEditTime(false);
  };

  return (
    <>
      <Container className={classes.container} maxWidth="xl">
        <Typography variant="h6">{todo.title}</Typography>
        <Typography className={classes.detail}>
          {' '}
          Zeitraum: {cleanDate(todo.assignedOn)} - {cleanDate(todo.expiresOn)}
        </Typography>
        <Typography className={classes.detail}>
          {' '}
          geschätzte Dauer: {todo.timeSpent}
        </Typography>
        <Button onClick={() => setEditTime(!editTime)}>Zeit korrigieren</Button>
        {editTime ? (
          <div style={{ maxWdith: '150px' }}>
            <input
              type="number"
              onChange={(e) => setUpdatedTime(e.target.value)}
            ></input>{' '}
            <button onClick={() => updateTime(todo, todo._id)}>
              korrigieren
            </button>
          </div>
        ) : null}

        <div className={classes.buttonbox}>
          {!todo.completed ? (
            <Button
              onClick={() => toggleComplete(todo, todo._id)}
              style={{
                border: '2px solid green',
                color: 'green',
                borderRadius: '4px',
                marginRight: '10px',
              }}
            >
              <DoneIcon />
            </Button>
          ) : null}

          <Button
            onClick={() => handleDelete(todo._id, todo.user)}
            style={{
              border: '2px solid red',
              color: 'red',
              borderRadius: '4px',
            }}
          >
            <DeleteIcon />
          </Button>
        </div>
      </Container>
    </>
  );
}
