import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { 
  Container,
  Button,
  Box,
  CircularProgress
} from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import TaskDetailsDisplay from '../components/taskDetailsDisplay'
import TaskEditForm from '../components/taskEditForm'
import tasksApi from '../api/tasks'

export default function TaskDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: '',
    description: '',
    dueDate: ''
  })

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true)
        const response = await tasksApi.getTask(id)
        setTask(response.data)
        setEditData({
          title: response.data.title,
          description: response.data.description,
          dueDate: response.data.dueDate
        })
      } catch (err) {
        setError('Failed to fetch task details')
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [id])

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditData({
      ...editData,
      [name]: value
    })
  }

  const handleSave = async () => {
    try {
      const updatedTask = { ...task, ...editData }
      const response = await tasksApi.updateTask(id, updatedTask)
      setTask(response.data)
      setIsEditing(false)
    } catch (err) {
      setError('Failed to update task')
      console.error(err)
    }
  }

  const handleDelete = async () => {
    try {
      await tasksApi.deleteTask(id)
      navigate('/tasks')
    } catch (err) {
      setError('Failed to delete task')
      console.error(err)
    }
  }

  const handleStatusToggle = async () => {
    try {
      const updatedTask = { ...task, status: !task.status }
      const response = await tasksApi.updateTask(id, updatedTask)
      setTask(response.data)
    } catch (err) {
      setError('Failed to update task status')
      console.error(err)
    }
  }

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    )
  }

  if (!task) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          {error || 'Task not found'}
        </Typography>
        <Button 
          component={Link}
          to="/tasks"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Back to Tasks
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          component={Link}
          to="/tasks"
          variant="outlined"
        >
          Back to Tasks
        </Button>
      </Box>

      {isEditing ? (
        <TaskEditForm
          task={task}
          editData={editData}
          onEditChange={handleEditChange}
          onSave={handleSave}
          onCancel={handleEditToggle}
        />
      ) : (
        <TaskDetailsDisplay
          task={task}
          onEditToggle={handleEditToggle}
          onDelete={handleDelete}
          onStatusToggle={handleStatusToggle}
        />
      )}
    </Container>
  )
}