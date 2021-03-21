import { Container, Typography, Grid, Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { deleteTodo } from '../services/index';
import { cleanDateWithYear } from '../services/helpers';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '50px',
  },
  todocontainer: {
    height: '80px',
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: '25px',
  },
  detail: {
    marginRight: '25px',
  },
  isdone: {
    backgroundColor: 'green',
  },
}));

export default function Archive({ users, todos, setUsers, setTodos }) {
  const { id } = useParams();
  const userTodos = todos.filter(
    (todo) => todo.user === id && todo.completed === true
  );
  const classes = useStyles();

  const handleDelete = async (todoId, userId) => {
    const remainingTodos = await deleteTodo(todoId);
    setTodos(remainingTodos);
  };
  console.log(userTodos.length);
  return (
    <>
      {userTodos.length > 0 ? (
        <Container className={classes.container}>
          {userTodos.map((todo) => (
            <Container
              key={todo._id}
              className={classes.todocontainer}
              maxWidth="xl"
            >
              <Typography variant="h6">
                {todo.title} (erledigt am: {cleanDateWithYear(todo.completedOn)}
                )
              </Typography>
              <Grid container>
                <Grid className={classes.details} item>
                  <DoneIcon
                    style={{
                      border: '2px solid green',
                      color: 'white',
                      backgroundColor: 'green',
                      borderRadius: '4px',
                      marginRight: '10px',
                    }}
                  />
                  <Typography className={classes.detail}>
                    {' '}
                    geschätzte Dauer: {todo.timeSpent}{' '}
                  </Typography>

                  <Button
                    size="small"
                    style={{
                      fontSize: '15px',
                      border: '2px solid grey',
                      marginRight: '5px',
                      borderRadius: '4px',
                    }}
                  >
                    <EditIcon fontSize="inherit" />
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleDelete(todo._id, todo.user)}
                    style={{
                      border: '2px solid red',
                      color: 'red',
                      borderRadius: '4px',
                    }}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </Button>
                </Grid>
              </Grid>
            </Container>
          ))}
        </Container>
      ) : (
        <h3 style={{ margin: '50px' }}>Keine Aufgaben erledigt</h3>
      )}
    </>
  );
}
