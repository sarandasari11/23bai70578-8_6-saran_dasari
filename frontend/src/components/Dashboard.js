import React, { useState } from "react";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

function Dashboard() {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");
  const token = sessionStorage.getItem("token");

  const fetchProtectedData = async () => {
    setError("");

    if (!token) {
      window.location.href = "/";
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/api/protected/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResponseData(response.data);
    } catch (err) {
      setResponseData(null);
      setError(err.response?.data?.message || "Unauthorized. Please log in again.");
      if (err.response?.status === 401 || err.response?.status === 403) {
        sessionStorage.removeItem("token");
        window.location.href = "/";
      }
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await axios.post(
          `${API_BASE_URL}/api/auth/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (_ignored) {
      // Session should be cleared even when logout endpoint is unreachable.
    } finally {
      sessionStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  return (
    <Container className="dashboard-page py-5 min-vh-100">
      <Card className="shadow-lg border-0">
        <CardContent className="p-4 p-md-5">
          <Stack direction="row" spacing={1} className="mb-3">
            <Chip label="JWT Secured" color="success" />
            <Chip label="Session Storage" color="primary" />
          </Stack>

          <Typography variant="h4" component="h1" className="fw-bold mb-2">
            Protected Dashboard
          </Typography>
          <Typography variant="body1" className="text-muted mb-4">
            This page is available only when a token exists in current browser session.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} className="mb-4">
            <Button variant="contained" color="success" onClick={fetchProtectedData}>
              Fetch Protected API
            </Button>
            <Button variant="outlined" color="error" onClick={logout}>
              Logout
            </Button>
          </Stack>

          {error && (
            <Alert severity="error" className="mb-3">
              {error}
            </Alert>
          )}

          <Box className="result-box p-3 rounded">
            <Typography variant="subtitle1" className="fw-semibold mb-2">
              API Response
            </Typography>
            <pre className="m-0 small">
              {responseData
                ? JSON.stringify(responseData, null, 2)
                : "Click 'Fetch Protected API' to call /api/protected/profile."}
            </pre>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Dashboard;
