import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuthStatus } from "../utils/APIRoutes";
import { Box, Typography } from "@mui/material"; // Material UI Box for styling

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null for loading state
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus()
      .then(() => setIsAuthenticated(true))
      .catch(() => navigate("/login")); // Redirect if not authenticated
  }, [navigate]);

  if (isAuthenticated === null) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "50vw",
          position: "center",
          minHeight: "100vh", // Full viewport height to center the loader
        }}
      >
        <img src="/GrowingFlower.gif" alt="loader" />
        <Typography>Loading...</Typography>
      </Box>
    ); // Show a loading message while checking auth status
  }

  return isAuthenticated ? children : null; 
};

export default ProtectedRoute;
