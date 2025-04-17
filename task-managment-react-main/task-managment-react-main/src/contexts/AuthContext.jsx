import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import usersApi from '../api/users'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  // Check for existing user on initial load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  const login = async (credentials) => {
    try {
      const userData = await usersApi.login(credentials)
      setUser(userData)
      return userData
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}