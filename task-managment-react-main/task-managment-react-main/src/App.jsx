import { Container } from '@mui/material'
import { Routes, Route , useLocation  } from 'react-router-dom'
import { useEffect } from 'react'
import TasksPage from './pages/tasksPage'
import TaskDetailPage from './pages/taskDetails'
import CreateTaskPage from './pages/createTask'
import NotFoundPage from './pages/notFound'
import RegisterPage from './pages/registerPage'
import LoginPage from './pages/loginPage'
import UserDetailsPage from './pages/userDetailsPage'
import Navbar from './components/navbar'
import { ProtectedRoute, AuthRoute } from './components/AuthRoute'

const routeTitles = {
  '/': 'Tasks',
  '/tasks': 'Tasks',
  '/profile':'Profile',
  '/login':'Login',
  '/register':'Register',
  '/tasks/create':'Add task',
};

function App() {
  const location = useLocation();

  useEffect(() => {
    const title = routeTitles[location.pathname] || 'Task';
    document.title = title;
  }, [location.pathname]);
  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
      <Routes>
        {/* Public routes */}
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<TasksPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/create" element={<CreateTaskPage />} />
          <Route path="/tasks/:id" element={<TaskDetailPage />} />
          <Route path="/profile" element={<UserDetailsPage />} />
        </Route>

        {/* 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </Container>
    </>
  )
}

export default App