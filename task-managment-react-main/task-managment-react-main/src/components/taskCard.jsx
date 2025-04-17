import { 
    Card, 
    CardContent, 
    Typography, 
    Button, 
    Chip, 
    Box,
    Checkbox,
    Stack
  } from '@mui/material'
  import { format } from 'date-fns'
  import { Link } from 'react-router-dom'
  import tasksApi from '../api/tasks'
  
  export default function TaskCard({ task, onStatusChange }) {
    const handleStatusToggle = async () => {
      try {
        const updatedTask = { ...task, status: !task.status }
        await tasksApi.updateTask(task._id, updatedTask)
        onStatusChange(task._id, updatedTask)
      } catch (error) {
        console.error('Failed to update task status:', error)
      }
    }
  
    return (
      <Card sx={{ mb: 2, opacity: task.status ? 0.7 : 1 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Checkbox
              checked={task.status}
              onChange={handleStatusToggle}
              color="primary"
            />
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography 
                  variant="h6" 
                  component="div"
                  sx={{ 
                    textDecoration: task.status ? 'line-through' : 'none',
                    color: task.status ? 'text.disabled' : 'text.primary'
                  }}
                >
                  {task.title}
                </Typography>
                {task.dueDate && (
                  <Chip 
                    label={`Due: ${format(new Date(task.dueDate), 'MMM dd, yyyy')}`}
                    color={new Date(task.dueDate) < new Date() ? 'error' : 'primary'}
                    size="small"
                  />
                )}
              </Box>
              
            </Box>
          </Stack>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              component={Link}
              to={`/tasks/${task._id}`}
              size="small"
              variant="outlined"
              disabled={task.status}
            >
              View Details
            </Button>
          </Box>
        </CardContent>
      </Card>
    )
  }