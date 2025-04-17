import { 
    TextField,
    Button,
    Box,
    Stack,
    Typography
  } from '@mui/material'
  import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material'
  import { format } from 'date-fns'
  import { useState } from 'react'
  
  export default function TaskEditForm({ 
    task, 
    editData, 
    onEditChange, 
    onSave, 
    onCancel 
  }) {
    const [errors, setErrors] = useState({
      title: false,
      description: false,
      dueDate: false
    })
  
    const validateForm = () => {
      const newErrors = {
        title: !editData.title.trim(),
        description: !editData.description.trim(),
        dueDate: !editData.dueDate
      }
      setErrors(newErrors)
      return !Object.values(newErrors).some(Boolean)
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      if (validateForm()) {
        onSave()
      }
    }
  
    const handleFieldChange = (e) => {
      const { name, value } = e.target
      onEditChange(e)
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: false }))
      }
    }
  
    return (
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={editData.title}
          onChange={handleFieldChange}
          margin="normal"
          required
          error={errors.title}
          helperText={errors.title ? "Title is required" : ""}
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={editData.description}
          onChange={handleFieldChange}
          margin="normal"
          multiline
          rows={4}
          required
          error={errors.description}
          helperText={errors.description ? "Description is required" : ""}
        />
        <TextField
          fullWidth
          label="Due Date"
          name="dueDate"
          type="datetime-local"
          value={editData.dueDate ? format(new Date(editData.dueDate), "yyyy-MM-dd'T'HH:mm") : ''}
          onChange={handleFieldChange}
          margin="normal"
          required
          error={errors.dueDate}
          helperText={errors.dueDate ? "Due date is required" : ""}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {Object.values(errors).some(Boolean) && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            Please fill in all required fields
          </Typography>
        )}
        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
          <Button
            startIcon={<CloseIcon />}
            onClick={onCancel}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            startIcon={<CheckIcon />}
            type="submit"
            variant="contained"
            color="success"
          >
            Save Changes
          </Button>
        </Stack>
      </Box>
    )
  }