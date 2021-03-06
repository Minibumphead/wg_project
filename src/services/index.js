import axios from 'axios';

const BASE_API_URL = 'http://localhost:5000';
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/users`);
    return response.data;
  } catch (error) {
    console.log('fetchUsers failed');
    console.log(error);
  }
};

export const deleteUser = async (user) => {
  const response = await axios.delete(`${BASE_API_URL}/users/${user._id}`);
  return response.data;
};

export const registerUser = async (formData) => {
  const response = await axios.post(`${BASE_API_URL}/users`, formData);
  return response.data;
};

export const updateUser = async (userId, data) => {
  const response = await axios.put(`${BASE_API_URL}/users/${userId}`, data);
  return response.data;
};

export const login = async (formData) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/users/login`, formData);
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
  const response = await axios.get(`${BASE_API_URL}/todos`);
  return response.data;
};

export const createTodo = async (formData) => {
  const response = await axios.post(`${BASE_API_URL}/todos`, formData);
  return response.data;
};

export const updateTodo = async (updatedTodo, todoId) => {
  const response = await axios.put(
    `${BASE_API_URL}/todos/${todoId}`,
    updatedTodo
  );
  return response.data;
};

export const deleteTodo = async (todoId) => {
  const response = await axios.delete(`${BASE_API_URL}/todos/${todoId}`);
  return response.data;
};
