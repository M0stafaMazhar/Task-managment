import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import format from "date-fns/format";
import tasksApi from "../api/tasks";

export default function CreateTaskPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: null,
    status: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dueDate: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      const taskToCreate = {
        ...formData,
        dueDate: formData.dueDate
          ? format(formData.dueDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
          : null,
      };

      await tasksApi.createTask(taskToCreate);
      navigate("/tasks");
    } catch (err) {
      setError(err.response?.data?.message.error || "Failed to create task");
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          Create New Task
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            mt: 3,
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Task Title"
            name="title"
            autoComplete="off"
            autoFocus
            value={formData.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="normal"
            fullWidth
            id="description"
            label="Description"
            name="description"
            autoComplete="off"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Due Date"
              value={formData.dueDate}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="normal"
                  sx={{ mb: 2 }}
                />
              )}
            />
          </LocalizationProvider>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1rem",
              }}
            >
              Create Task
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
