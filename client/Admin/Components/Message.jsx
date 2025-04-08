import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUIContext } from '../../src/components/context/ui';
import {Colors} from '../../src/styles/theme'


export default function Message() {
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
                    backgroundImage: 'url(/support.jpg)', // Set the image URL here
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    overflow: 'hidden',
                     // Send the image to the background
                }}
            />

            {/* Text and buttons */}
            <Box sx={{ zIndex: 1, textAlign: 'center', color: 'black', backgroundColor:'white',
                borderRadius: '10px', padding: '20px', boxShadow: 3, width: '40%',
             }}>
                <Typography variant="h4" gutterBottom>
                    PAGE NOT READY
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        This Feild is not ready yet!
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
