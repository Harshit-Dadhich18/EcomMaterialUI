import { Badge, Divider, ListItemButton, ListItemIcon } from "@mui/material";
import { ActionIconsContainerDesktop, ActionIconsContainerMobile, MyList } from "../../styles/appbar";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonIcon from '@mui/icons-material/Person'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Colors } from "../../styles/theme";
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "../../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { useUIContext } from "../context/ui";

export default function Actions({ matches }) {
    const { cart, setShowCart, setShowProfile, setNotifications,
        setNotificationMessage,
        setNotificationColor } = useUIContext();
    const Component = matches ? ActionIconsContainerMobile : ActionIconsContainerDesktop;
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    }

    const handleFavorites = () => {
        setNotificationMessage("You can't add to favorites yet!");
        setNotificationColor(Colors.info);
        setNotifications(true);
    }

    return (
        <Component>
            <MyList type="row">
                <ListItemButton
                    sx={{
                        justifyContent: 'center'
                    }}>
                    <ListItemIcon
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            color: matches && Colors.secondary
                        }} onClick={() => setShowCart(true)} >
                        <Badge badgeContent={cart && cart.length} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>

                    </ListItemIcon>
                </ListItemButton>
                <Divider orientation="vertical" flexItem />
                <ListItemButton
                    sx={{
                        justifyContent: 'center'
                    }}>
                    <ListItemIcon
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            color: matches && Colors.secondary
                        }}
                        onClick={handleFavorites}>
                        <FavoriteIcon />
                    </ListItemIcon>
                </ListItemButton>
                <Divider orientation="vertical" flexItem />
                <ListItemButton
                    sx={{
                        justifyContent: 'center'
                    }}>
                    <ListItemIcon onClick={() => setShowProfile(true)}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            color: matches && Colors.secondary
                        }}>
                        <PersonIcon />
                    </ListItemIcon>
                </ListItemButton>
                <Divider orientation="vertical" flexItem />
                <ListItemButton
                    sx={{
                        justifyContent: 'center'
                    }} onClick={handleLogout}>
                    <ListItemIcon
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            color: matches && Colors.secondary
                        }}>
                        <LogoutIcon />
                    </ListItemIcon>
                </ListItemButton>
                <Divider orientation="vertical" flexItem />
            </MyList>
        </Component>
    )
}