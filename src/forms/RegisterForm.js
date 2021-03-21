import { useState } from 'react';
import Joi from 'joi';
import { registerUser } from './../services/index';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  input: {
    padding: '8px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#f6f6f6',
    marginBottom: '10px',
    '&:hover': {
      backgroundColor: 'rgb(230,230,230)',
      cursor: 'pointer',
    },
  },
  container: {
    width: '22.5%',
    marginTop: '5%',
  },
  form: {
    paddingTop: '70px',
    padding: '30px 80px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '15px',
    height: '400px',
  },
  title: {
    marginBottom: '20px',
  },
  submitbutton: {
    marginTop: '10px',
    width: '45%',
    alignSelf: 'center',
    borderRadius: '5px',
    background: '#f6f6f6',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    '&:hover': {
      backgroundColor: 'rgb(230,230,230)',
    },
  },
}));

// prop history is passed when you use component = {} within <Route /> component
export default function RegisterForm({ users, setUsers, history }) {
  const classes = useStyles();
  const [formData, setFormdata] = useState({
    username: '',
    email: '',
    password: '',
    confirm: '',
  });
  const handleChange = (event) => {
    if (event.target.name === 'username') {
      setFormdata({ ...formData, username: event.target.value });
    } else if (event.target.name === 'email') {
      setFormdata({ ...formData, email: event.target.value });
    } else if (event.target.name === 'password') {
      setFormdata({ ...formData, password: event.target.value });
    } else if (event.target.name === 'confirm') {
      setFormdata({ ...formData, confirm: event.target.value });
    }
  };

  const validateForm = (formData) => {
    const schema = Joi.object({
      username: Joi.string().alphanum().min(1).max(20),
      email: Joi.any(),
      password: Joi.string().min(3).max(10),
      confirm: Joi.ref('password'),
    });
    try {
      const { error } = schema.validate({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirm: formData.confirm,
      });
      if (error) throw error;
    } catch (error) {
      alert(error.message);
      return error;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const error = validateForm(formData);
    try {
      if (error) throw error;
      const data = await registerUser(formData);
      localStorage.setItem('user', JSON.stringify(data));
      setUsers([...users, data]);
      history.push('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Container className={classes.container}>
        <Paper className={classes.form}>
          <h3 className={classes.title}>Hier Anmelden</h3>
          <input
            className={classes.input}
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Benutzername"
          ></input>
          <input
            className={classes.input}
            name="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          ></input>
          <input
            className={classes.input}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Passwort"
          ></input>
          <input
            className={classes.input}
            name="confirm"
            type="password"
            value={formData.confirm}
            onChange={handleChange}
            placeholder="Passwort Bestätigung"
          ></input>
          <button className={classes.submitbutton} onClick={handleSubmit}>
            {' '}
            Anmelden{' '}
          </button>
        </Paper>
      </Container>
    </>
  );
}
