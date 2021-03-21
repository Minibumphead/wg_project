import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyConten: 'space-between',
    margin: '20px',
  },
  title: {
    fontWeight: '600',
    marginBottom: '10px',
  },
  fieldname: {
    width: '150px',
    marginRight: '10px',
  },
  value: {
    width: '25px',
  },
}));

export default function Dashboard({ user, todos, users, setUsers, setTodos }) {
  const classes = useStyles();

  const userTodos = todos.filter((todo) => todo.user === user._id);
  const completedTodos = userTodos.filter((todo) => todo.completed === true);
  const remainingTodos = userTodos.filter((todo) => todo.completed === false);

  const calcScore = (completedTodos) => {
    let i = 0;
    var score = 0;
    for (i = 0; i < completedTodos.length; i++) {
      score += completedTodos[i].timeSpent;
    }
    return score;
  };

  return (
    <>
      <div>
        <Typography className={classes.title} variant="h5">
          {user.username}
        </Typography>

        <Container className={classes.container} maxWidth="xl">
          <Typography className={classes.fieldname}>
            Aufgaben in Liste
          </Typography>
          <Typography className={classes.value}>
            {remainingTodos.length}
          </Typography>
        </Container>

        <Container className={classes.container} maxWidth="xl">
          <Typography className={classes.fieldname}>
            Aufgaben erledigt
          </Typography>
          <Typography className={classes.value}>
            {completedTodos.length}
          </Typography>
        </Container>

        <Container className={classes.container} maxWidth="xl">
          <Typography className={classes.fieldname}>Zeit gesamt</Typography>
          <Typography className={classes.value}>
            {calcScore(completedTodos)}
          </Typography>
        </Container>

        <Link to={`/archiv/${user._id}`}>Erledigte Aufgaben ansehen</Link>
      </div>
    </>
  );
}
