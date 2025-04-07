import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
import { useUIContext } from '../context/ui';
import { Typography } from '@mui/material';

export default function SwipeableTemporaryDrawer() {
    const {contactUs, setContactUs} = useUIContext();

    const list = () => (
        <Box
            
            sx={{ width: 250, height:150, display:"flex", alignItems:"center",flexDirection:'column', justifyContent:'center' }}
            role="presentation"
            onClick={contactUs}
            onKeyDown={()=> setContactUs(false)}
        >

            <Typography variant='h5' sx={{ padding: '10px 20px' }}>
                Contact Us
            </Typography>
            <Divider />
            <Typography variant='body1' sx={{ padding: '10px 20px' }}>
                Contact@gamil.com
            </Typography>

            {/* <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> */}
        </Box>
    );

    return (
        <div>
            <SwipeableDrawer
                anchor="bottom"
                open={contactUs}
                onClose={()=> setContactUs(false)}
                // onOpen={toggleDrawer(anchor, true)}
            >
                {list()}
            </SwipeableDrawer>
        </div>
    );
}
