import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Button,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import TaskCard from "../components/taskCard";
import tasksApi from "../api/tasks";
import { useAuth } from "../contexts/AuthContext";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState("all");
  const { user } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await tasksApi.getTasks();
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchTasks();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleStatusChange = (taskId, updatedTask) => {
    setTasks(tasks.map((task) => (task._id === taskId ? updatedTask : task)));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredTasks = tasks.filter((task) => {
    if (tabValue === "completed") return task.status;
    if (tabValue === "active") return !task.status;
    return true;
  });

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">My Tasks</Typography>
        <Button component={Link} to="/tasks/create" variant="contained">
          Create Task
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="All" value="all" />
          <Tab label="Active" value="active" />
          <Tab label="Completed" value="completed" />
        </Tabs>
      </Box>

      {filteredTasks.length === 0 ? (
        <Typography>
          No tasks found. {tabValue !== "all" && "Try changing the filter."}
        </Typography>
      ) : (
        filteredTasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onStatusChange={handleStatusChange}
          />
        ))
      )}
    </Container>
  );
}
