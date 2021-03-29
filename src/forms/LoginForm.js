import { useState } from 'react';
import { login } from './../services/index';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  input: {
    padding: '8px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#f6f6f6',
    marginBottom: '10px',
    '&:hover': {
      backgroundColor: 'rgb(230,230,230)',
      cursor: 'pointer',
    },
  },
  container: {
    positin: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '600px',
  },
  form: {
    padding: '30px 50px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
    height: '300px',
  },
  title: {
    marginBottom: '20px',
  },
  submitbutton: {
    marginTop: '10px',
    width: '33%',
    alignSelf: 'center',
    borderRadius: '5px',
    background: '#f6f6f6',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    '&:hover': {
      backgroundColor: '#04451C',
      transition: 'all 1200ms',
      color: 'white',
      fontWeight: 500,
    },
  },
}));

export default function LoginForm({ history }) {
  const classes = useStyles();
  const [formData, setFormdata] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    if (event.target.name === 'username') {
      setFormdata({ ...formData, username: event.target.value });
    } else if (event.target.name === 'password') {
      setFormdata({ ...formData, password: event.target.value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (await login(formData)) {
      history.push('/admin');
    }
  };

  return (
    <>
      <div className={classes.container}>
        <Paper className={classes.form}>
          <h3 className={classes.title}>Login</h3>
          <input
            className={classes.input}
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="username"
          ></input>

          <input
            className={classes.input}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="password"
          ></input>

          <button className={classes.submitbutton} onClick={handleSubmit}>
            {' '}
            Anmdelden{' '}
          </button>
        </Paper>
      </div>
    </>
  );
}
