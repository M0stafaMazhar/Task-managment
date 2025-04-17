import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Protected route for authenticated users
export function ProtectedRoute() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

// Auth route for non-authenticated users (login/register)
export function AuthRoute() {
  const { user } = useAuth()

  if (user) {
    return <Navigate to="/tasks" replace />
  }

  return <Outlet />
}