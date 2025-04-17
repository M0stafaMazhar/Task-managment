import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import usersApi from "../api/users";
import { useAuth } from "../contexts/AuthContext";

export default function UserDetailsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { logOut } = useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
          navigate("/login");
          return;
        }

        const response = await usersApi.getUserDetails();
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user details:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!user) {
    return <Typography>No user data available</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ width: 100, height: 100, mb: 2 }}>
          {user.userName.charAt(0).toUpperCase()}
        </Avatar>
        <Typography component="h1" variant="h5">
          User Profile
        </Typography>
        <List sx={{ width: "100%", mt: 2 }}>
          <ListItem>
            <ListItemText primary="Username" secondary={user.userName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Email" secondary={user.email} />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}
