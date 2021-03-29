import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { Button, Paper } from '@material-ui/core';

import { createTodo } from './../services/index';
import Select from './../components/Select';
import { validateForm } from '../services/helpers';

const useStyles = makeStyles((theme) => ({
  formbody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '25px 50px',
    width: '20%',
    marginBottom: '25px',
    marginTop: '25px',
    borderRadius: '10px',
  },
  datepicker: {
    height: '25px',
    width: '100%',
    backgroundColor: '#f6f6f6',
    border: 'none',
    flex: 1,
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: 'rgb(230,230,230)',
      cursor: 'grab',
    },
  },
  button: {
    height: '50px',
    backgroundColor: '#f6f6f6',
    '&:hover': {
      backgroundColor: 'rgb(230,230,230)',
    },
  },
  validation: {
    background: 'red',
  },
}));

export default function CreateTodoForm({
  users,
  todos,
  setTodos,
  showTodoForm,
  setShowTodoForm,
}) {
  const classes = useStyles();
  const today = new Date();
  const myDate = new Date();
  const myNewDate = new Date();
  const nextWeek = new Date(myDate.setDate(myDate.getDate() + 7));
  const nextDay = new Date(myNewDate.setDate(myNewDate.getDate() + 1));
  const timeoptions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
  const todooptions = ['Küche', 'Bad', 'Gang', 'Sonstiges'];
  const useroptions = users.map((user) => user.username);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedOn: today,
    expiresOn: nextWeek,
    timeSpent: '',
    username: '',
  });
  const [validationErrors, setValidationErrors] = useState();

  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.name === 'title') {
      setFormData({ ...formData, title: event.target.value });
    }
    if (event.target.name === 'description') {
      setFormData({ ...formData, description: event.target.value });
    }
    if (event.target.name === 'timeSpent') {
      setFormData({ ...formData, timeSpent: event.target.value });
    }
    if (event.target.name === 'username') {
      setFormData({ ...formData, username: event.target.value });
    }
  };

  const handleSubmit = async (event) => {
    if (!validateForm(formData)) {
      setValidationErrors('Bitte alle Felder ausfüllen');
      return;
    }
    event.preventDefault();
    const newTodo = await createTodo(formData);
    setTodos([...todos, newTodo]);
    setValidationErrors('');
    setFormData({
      title: '',
      description: '',
      assignedOn: today,
      expiresOn: nextWeek,
      timeSpent: '',
      username: '',
    });
  };

  return (
    <>
      {showTodoForm ? (
        <Paper className={classes.formbody} onSubmit={handleSubmit}>
          <Button
            className={classes.button}
            onClick={() => setShowTodoForm(false)}
          >
            <CloseIcon />
          </Button>

          <Select
            handleChange={handleChange}
            name="username"
            label="Wer?"
            value={formData.username}
            options={useroptions}
          ></Select>
          <Select
            name="title"
            label="Was?"
            handleChange={handleChange}
            value={formData.title}
            options={todooptions}
          ></Select>
          <Select
            name="timeSpent"
            label="Dauer?"
            handleChange={handleChange}
            value={formData.timeSpent}
            options={timeoptions}
          ></Select>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              flex: 1,
            }}
          >
            <DatePicker
              className={classes.datepicker}
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              selected={formData.assignedOn ? formData.assignedOn : new Date()}
              onChange={(date) =>
                setFormData({ ...formData, assignedOn: new Date(date) })
              }
            />

            <DatePicker
              className={classes.datepicker}
              minDate={nextDay}
              dateFormat="dd/MM/yyyy"
              selected={formData.expiresOn ? formData.expiresOn : new Date()}
              onChange={(date) =>
                setFormData({ ...formData, expiresOn: new Date(date) })
              }
            />
          </div>
          {validationErrors ? (
            <div className={classes.validation}>{validationErrors}</div>
          ) : null}
          <Button className={classes.button} onClick={handleSubmit}>
            {' '}
            <AddIcon /> Hinzufügen{' '}
          </Button>
        </Paper>
      ) : null}
    </>
  );
}
