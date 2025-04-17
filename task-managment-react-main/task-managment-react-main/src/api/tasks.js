import axios from 'axios'

const API_URL = 'http://localhost:3000/tasks' 

const getTasks = async () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return await axios.get(API_URL ,{
    headers: {
      authorization: `Bearer ${user.token}`,
    },
  })
}

const getTask = async (id) => {
  const user = JSON.parse(localStorage.getItem('user'))
  return await axios.get(`${API_URL}/${id}` , {
    headers: {
      authorization: `Bearer ${user.token}`,
    },
  })
}

const createTask = async (taskData) => {
  const user = JSON.parse(localStorage.getItem('user'))
  return await axios.post(API_URL, taskData, {
    headers: {
      authorization: `Bearer ${user.token}`,
    },
  })
}

const updateTask = async (id, taskData) => {
  const user = JSON.parse(localStorage.getItem('user'))
  return await axios.put(`${API_URL}/${id}`, taskData ,{
    headers: {
      authorization: `Bearer ${user.token}`,
    },
  })
}

const deleteTask = async (id) => {
  const user = JSON.parse(localStorage.getItem('user'))
  return await axios.delete(`${API_URL}/${id}` , {
    headers: {
      authorization: `Bearer ${user.token}`,
    },
  })
}

export default {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
}