import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import   {checkAuthStatus }  from '../utils/APIRoutes'
import { Box, Typography } from "@mui/material"; // Material UI Box for styling

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null for loading state
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async()=>{
      try{
      await axios.get(checkAuthStatus,{ withCredentials: true })
      setIsAuthenticated(true);
      }
      catch(err){
        setIsAuthenticated(false);
        navigate("/login");
      }
    } // Redirect if not authenticated
    checkAuth(); 
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

  return isAuthenticated ? children : null; 
};

export default ProtectedRoute;
