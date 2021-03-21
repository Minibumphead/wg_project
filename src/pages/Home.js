import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';

import Dashboard from './../components/Dashboard';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '125px',
    width: '80vw',
    padding: 0,
  },
  paper: {
    border: '2px solid grey',
    borderRadius: '10px',
    padding: '35px 40px',
    backgroundColor: 'rgb(233,233,233)',
    height: '400px',
  },
}));
export default function Home({ users, todos, setUsers, setTodos }) {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Grid container spacing={8}>
        {users.map((user) => (
          <Grid item lg={4} key={user._id}>
            <Paper className={classes.paper}>
              <Dashboard
                user={user}
                todos={todos}
                setTodos={setTodos}
                users={users}
                setUsers={setUsers}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
