import axios from 'axios';

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/users`);
    return response.data;
  } catch (error) {
    console.log('fetchUsers failed');
    console.log(error);
  }
};

export const deleteUser = async (user) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_API}/users/${user._id}`
  );
  return response.data;
};

export const registerUser = async (formData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API}/users`,
    formData
  );
  return response.data;
};

export const updateUser = async (userId, data) => {
  const response = await axios.put(
    `${process.env.REACT_APP_API}/users/${userId}`,
    data
  );
  return response.data;
};

export const login = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/users/login`,
      formData
    );
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
    console.log('user could not be logged in');
  }
};

export const logout = async (history) => {
  await localStorage.removeItem('user');
  history.push('/login');
};

// Todos Servides

export const fetchTodos = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API}/todos`);
  return response.data;
};

export const createTodo = async (formData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API}/todos`,
    formData
  );
  return response.data;
};

export const updateTodo = async (updatedTodo, todoId) => {
  const response = await axios.put(
    `${process.env.REACT_APP_API}/todos/${todoId}`,
    updatedTodo
  );
  return response.data;
};

export const deleteTodo = async (todoId) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_API}/todos/${todoId}`
  );
  return response.data;
};
