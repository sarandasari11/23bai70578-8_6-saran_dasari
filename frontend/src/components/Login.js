import React, { useState } from "react";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        username,
        password,
      });

      if (response.data?.token) {
        sessionStorage.setItem("token", response.data.token);
        window.location.href = "/dashboard";
      } else {
        setError("Login failed: token was not returned by the server.");
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Invalid credentials or backend is unavailable. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="auth-page d-flex align-items-center justify-content-center min-vh-100">
      <Card className="auth-card shadow-lg border-0">
        <CardContent className="p-4 p-md-5">
          <Typography variant="h4" component="h1" className="fw-bold mb-2">
            Experiment 6 Login
          </Typography>
          <Typography variant="body1" className="text-muted mb-4">
            Enter your credentials to request a JWT and start a session.
          </Typography>

          {error && (
            <Alert severity="error" className="mb-3">
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              className="mt-3"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Login;
