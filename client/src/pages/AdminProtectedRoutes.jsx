import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import axios from "axios";
import { checkAuthStatus } from "../utils/APIRoutes"; // assuming checkAuthStatus is the utility to check auth status

const AdminProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Track if the user is authenticated
  const [isAdmin, setIsAdmin] = useState(false); // Track if the user is an admin
  const navigate = useNavigate();

  useEffect(() => {
    // Function to check the user's authentication status and role (admin)
    const checkAuth = async () => {
      try {
        const response = await axios.get(checkAuthStatus,{ withCredentials: true }); // You call your checkAuthStatus utility here
        const user = response.data.user; // This contains user details (id, role, etc.)
        if (response.data.isAuthenticated && user.isAdmin) {
          setIsAuthenticated(true);
          setIsAdmin(true);
        } else {
          setIsAuthenticated(false);
          navigate("/"); // Redirect if not admin
        }
      } catch (error) {
        console.error("Error in authentication check:", error);
        setIsAuthenticated(false);
        navigate("/login"); // Redirect to login page if error occurs
      }
    };

    checkAuth(); // Call the checkAuth function to verify authentication and role
  }, [navigate]);

  if (isAuthenticated === null) {
    return (
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ minHeight: "100vh" }}
      >
        <img 
          src="/GrowingFlower.gif" 
          alt="loader" 
          style={{
            width: 'auto',
            maxWidth: '80%', 
            height: 'auto',
            maxHeight: '80vh', 
          }}
        />
      </Box>
    ); 
  }
  return isAuthenticated && isAdmin ? children : null;
};

export default AdminProtectedRoute;
