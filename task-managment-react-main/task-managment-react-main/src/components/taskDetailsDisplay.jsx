import { 
    Typography,
    Box,
    Chip,
    Divider,
    Button,
    Stack
  } from '@mui/material'
  import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
  import { format } from 'date-fns'
  
  export default function TaskDetailsDisplay({ 
    task, 
    onEditToggle, 
    onDelete, 
    onStatusToggle 
  }) {
    return (
      <Box sx={{ mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1">
            {task.title}
          </Typography>
          <Chip
            label={task.status ? 'Completed' : 'Pending'}
            color={task.status ? 'success' : 'warning'}
            onClick={onStatusToggle}
            clickable
          />
        </Box>
  
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 3 }}>
          <Chip
            label={`Due: ${format(new Date(task.dueDate), 'MMM dd, yyyy')}`}
            color={new Date(task.dueDate) < new Date() ? 'error' : 'primary'}
          />
          {new Date(task.dueDate) < new Date() && !task.status && (
            <Chip
              label="Overdue"
              color="error"
              variant="outlined"
              sx={{ ml: 1 }}
            />
          )}
        </Box>
  
        <Divider sx={{ my: 3 }} />
  
        <Typography variant="h6" gutterBottom>
          Description
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            whiteSpace: 'pre-wrap',
            textDecoration: task.status ? 'line-through' : 'none',
            color: task.status ? 'text.disabled' : 'text.primary'
          }}
        >
          {task.description}
        </Typography>
  
        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
          <Button
            startIcon={<EditIcon />}
            onClick={onEditToggle}
            variant="contained"
          >
            Edit Task
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            onClick={onDelete}
            variant="outlined"
            color="error"
          >
            Delete Task
          </Button>
        </Stack>
      </Box>
    )
  }