import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('E-mail is required'),
    password: Yup.string().required('Password is required').min(8, 'Error'),
})

export default function Register() {
    const navigate = useNavigate();
    const { setNotifications, setNotificationMessage, setNotificationColor } = useUIContext();

    const [initialValues, setIntialValues] = React.useState({
        username: '',
        email: '',
        password: ''
    })
    React.useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/auth/status", {
                    withCredentials: true, // Ensure cookies are sent
                });

                if (response.data.isAuthenticated) {
                    navigate("/login"); // Redirect to homepage if authenticated
                }
            } catch (error) {
                // console.error("User is not authenticated", error);
            }
        };
        checkAuth();
    }, [navigate]);

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/register",
                values,
                { withCredentials: true }
            );

            if (response.data.status) {
                navigate("/login"); // Redirect to login page after successful registration
                setNotificationMessage("Successfully Registered! Please login.");
                setNotificationColor(Colors.success);
                setNotifications(true);
            } else {
                // setErrors({ general: response.data.msg });
                setNotificationMessage("Registration failed. Please try again.");
                setNotificationColor(Colors.danger);
                setNotifications(true);
            }
        } catch (error) {
            // console.error("Registration error:", error);
            // setErrors({ general: "Registration failed. Please try again." });
            setNotificationMessage("Registration failed. Please try again.");
            setNotificationColor(Colors.danger);
            setNotifications(true);
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Card sx={{ maxWidth: 345, }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image="Logo.png"
                    title="green iguana"
                />
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}>
                    {({ dirty, isValid, getFieldProps }) => (
                        <Form >
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
                                <Field name="email">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Email"
                                            variant="outlined"
                                            fullWidth
                                            sx={{ marginBottom: '10px' }}
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
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
                                fullWidth>Register</Button>

                        </Form>
                    )}
                </Formik>
                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                    Already have a account!
                </Typography>
                <CardActions>
                    <Button size="small" onClick={() => navigate('/login')}>Login</Button>
                </CardActions>
            </Card>
        </Box>
    );
}