import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useUIContext } from '../context/ui';
import { Colors } from '../../styles/theme'; // Ensure Colors is imported
import { CheckCircle, Error, Info, Warning } from '@mui/icons-material';

export default function Notifications() {
    const { notifications, setNotifications, notificationMessage, notificationColor } = useUIContext();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotifications(false); // Close the notification
    };

    // Logic to set the icon and background color based on the notification type
    let icon;
    let iconColor;
    let backgroundColor = notificationColor;

    // Assuming notificationColor reflects the type (e.g., Colors.success for success)
    if (backgroundColor === Colors.success) {
        icon = <CheckCircle />;
        iconColor = Colors.white;
    } else if (backgroundColor === Colors.danger) {
        icon = <Error />;
        iconColor = Colors.white;
    } else if (backgroundColor === Colors.warning) {
        icon = <Warning />;
        iconColor = Colors.black;
    } else if (backgroundColor === Colors.info) {
        icon = <Info />;
        iconColor = Colors.black;
    }

    return (
        <div>
            <Snackbar open={notifications} autoHideDuration={6000} onClose={handleClose} sx={{zIndex: 1301}}>
                <Alert
                    onClose={handleClose}
                    variant="filled"
                    sx={{
                        
                        width: '100%',
                        backgroundColor: backgroundColor,  // Custom background color
                        color: iconColor,  // Custom text color
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px 16px',
                        borderRadius: '4px',
                        zIndex: 1301,
                    }}
                    icon={icon}  // Pass custom icon based on notification type
                >
                    {notificationMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}
