import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Colors } from '../styles/theme';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useUIContext } from '../components/context/ui';
import { checkAuthStatus,login } from '../utils/APIRoutes';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required').min(8, 'Error'),
});

export default function Login() {
  const navigate = useNavigate();
  const [initialValues, setIntialValues] = React.useState({
    username: '',
    password: ''
  });
  const { setIsAdmin, 
    setUserDetails,
    userDetails, 
    setNotifications, 
    setNotificationMessage,
    setNotificationColor } = useUIContext(); // To update the context


  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(checkAuthStatus, {
          withCredentials: true, // Ensure cookies are sent
        });
        

        if (response.data.isAuthenticated) {
          navigate("/"); // Redirect to homepage if authenticated
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // console.log("User is not authenticated, staying on login page.");
          // setNotificationMessage("User is not authenticated, staying on login page.");
          // setNotifications(true);
        } 
        else {
          console.error("Error checking authentication status:", error);
        }
      }
    };

    checkAuth();
  }, [navigate]);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post(login,
        values,  // Pass username & password
        { withCredentials: true }
      );
      const user = response.data.user; // Get user object from response
      // console.log("user",user);
      if (response.data.success) {
        setUserDetails(user.id, user.username, user.email);// Set user object
        if (user.isAdmin) {
          setIsAdmin(true);
          navigate("/admin"); // Redirect to admin page if user is admin
        } else {
          navigate("/"); 
          setNotificationMessage("Successfully logged in!");
          setNotificationColor(Colors.success);
          setNotifications(true); 
        }
      } else {
        // setErrors({ general: response.data.message || "Login failed" });
        setNotificationMessage("Login failed! Please try again.");
        setNotificationColor(Colors.danger); // Red color for error
        setNotifications(true); 
      }
    } catch (err) {
      // console.error(err.response?.data?.message || "Login failed");
      // setErrors({ general: "Invalid username or password" });
      setNotificationMessage("Invalid username or password!");
      setNotificationColor(Colors.danger);
      setNotifications(true);
    } finally {
      setSubmitting(false);
    }
  };
  // React.useEffect(() => {
  //   console.log("userDetails updated:", userDetails); // Log to verify if it changes
  // }, [userDetails]);


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="Logo.png"
          title="Logo"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ dirty, isValid }) => (
            <Form>
              <CardContent>
                <Field name="username">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Username"
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: '10px' }}
                    />
                  )}
                </Field>
                <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
                <Field name="password">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: '10px' }}
                    />
                  )}
                </Field>
                <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
              </CardContent>
              <Button
                type="submit"
                disabled={!dirty || !isValid}
                sx={{
                  color: 'white',
                  background: Colors.primary,
                }}
                fullWidth
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          Don't have an account? Register now
        </Typography>
        <CardActions>
          <Button size="small" onClick={() => navigate('/register')}>Register now</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
