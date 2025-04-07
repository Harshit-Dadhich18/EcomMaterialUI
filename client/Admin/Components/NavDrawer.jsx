import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Colors, DrawerWidth } from '../../src/styles/theme';
import Appbar from './Appbar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import GroupsIcon from '@mui/icons-material/Groups';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';


export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const MyListItemButton = ({ selected, icon, text, handleNavBarItemClicked }) => {
    const navigate = useNavigate();
    return (
        <ListItemButton onClick={()=> handleNavBarItemClicked(text)}
        sx={{
            ...(selected && {
                background: Colors.white,
                borderRadius: 2,
                fontWeight: 'bold',
                color: Colors.black
            })
        }}>
            <ListItemIcon sx={{ color: selected && Colors.primary}}>
                {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItemButton>
    )
}

export default function NavDrawer({ open, setOpen }) {
    const theme = useTheme();
    const [selectedItem,setSelectedItem] = React.useState('');
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleNavBarItemClicked = async(item) => {
        setSelectedItem(item);
        if(item === 'home'){
            navigate('/')
        }
        else{
        navigate(item);
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Appbar open={open} handleDrawerOpen={handleDrawerOpen} />
            <Drawer
                sx={{
                    width: DrawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: DrawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                {open &&<Typography fontWeight={'bold'} 
                    color={Colors.black} variant="h6" noWrap component="div">
                        Admin Dashboard
                    </Typography>}
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <MyListItemButton 
                        text={"dashboard"}
                        icon={<DashboardIcon />}
                        handleNavBarItemClicked={handleNavBarItemClicked}
                        selected={selectedItem.includes('dashboard')}/>
                    </ListItem>
                    <ListItem disablePadding>
                        <MyListItemButton 
                        text={"products"}
                        icon={<ReceiptIcon />}
                        handleNavBarItemClicked={handleNavBarItemClicked}
                        selected={selectedItem.includes('products')}/>
                    </ListItem>
                    <ListItem disablePadding>
                        <MyListItemButton 
                        text={"messages"}
                        icon={<MailIcon />}
                        handleNavBarItemClicked={handleNavBarItemClicked}
                        selected={selectedItem.includes('messages')}/>
                    </ListItem>
                    <ListItem disablePadding>
                        <MyListItemButton 
                        text={"customers"}
                        icon={<GroupsIcon />}
                        handleNavBarItemClicked={handleNavBarItemClicked}
                        selected={selectedItem.includes('customer')}/>
                    </ListItem>
                    <ListItem disablePadding>
                        <MyListItemButton 
                        text={"orders"}
                        icon={<ShoppingBagIcon />}
                        handleNavBarItemClicked={handleNavBarItemClicked}
                        selected={selectedItem.includes('settings')}/>
                    </ListItem>
                    <ListItem disablePadding>
                        <MyListItemButton 
                        text={"home"}
                        icon={<LogoutIcon />}
                        handleNavBarItemClicked={handleNavBarItemClicked}
                        selected={selectedItem.includes('home')}/>
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
        </Box>
    );
}
