import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUIContext } from '../components/context/ui';
import { Colors } from '../styles/theme';

export default function NotFound() {
    const { setNotifications, setNotificationMessage, setNotificationColor } = useUIContext();
    const navigate = useNavigate();

    // Set the notification message and color
    React.useEffect(() => {
        setNotificationMessage("Page Not Found");
        setNotificationColor(Colors.warning);
        setNotifications(true);

        // Hide notification after 2 seconds
        const timeout = setTimeout(() => {
            setNotifications(false);
        }, 2000);

        // Cleanup the timeout
        return () => clearTimeout(timeout);
    }, [setNotifications, setNotificationMessage, setNotificationColor]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                position: 'relative', // Allow absolute positioning of the image
                backgroundColor: Colors.body_bg,
            }}
        >
            {/* Full screen image */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    backgroundImage: 'url(/error.svg)', // Set the image URL here
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    
                     // Send the image to the background
                }}
            />

            {/* Text and buttons */}
            <Box sx={{ zIndex: 1, textAlign: 'center', color: 'wheat' }}>
                <Typography variant="h4" gutterBottom>
                    PAGE NOT FOUND
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate('/')}
                    >
                        Home
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
