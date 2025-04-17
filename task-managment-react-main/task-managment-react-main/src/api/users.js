import axios from 'axios'

const API_URL = 'http://localhost:3000' // Update with your backend URL

const register = async (userData) => {
  return await axios.post(`${API_URL}/auth/register`, userData)
}

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials)
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}


const getUserDetails = async () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return await axios.get(`${API_URL}/user/user-data`, {
    headers: {
      authorization: `Bearer ${user.token}`,
    },
  })
}

export default {
  register,
  login,
  getUserDetails,
}