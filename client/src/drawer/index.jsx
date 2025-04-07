import { Divider, List, ListItemButton, ListItemText } from "@mui/material"
import Drawer from "@mui/material/Drawer"
import { styled } from "@mui/system";
import { useUIContext } from "../components/context/ui";
import { DrawerCloseButton } from "../styles/appbar";
import CloseIcon from '@mui/icons-material/Close';
import { lighten } from "polished";
import { Colors } from "../styles/theme";
import { logout } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";

const MiddleDivider = styled((props) => (
    <Divider variant="middle" {...props} />
))``;

export default function AppDrawer() {
    const navigate = useNavigate();
    const { drawerOpen, setDrawerOpen } = useUIContext();

    const handleLogout = async() => {
        await logout();
        navigate('/login');
    }

    return (
        <>
            {drawerOpen && <DrawerCloseButton onClick={() => setDrawerOpen(false)}>
                <CloseIcon
                    className="testing"
                    sx={{
                        fontSize: '2.5rem',
                        color: lighten(0.09, Colors.secondary),
                    }} />
            </DrawerCloseButton>}
            <Drawer open={drawerOpen}>
                <List>
                    <ListItemButton>
                        <ListItemText>
                            Home
                        </ListItemText>
                    </ListItemButton>
                    <MiddleDivider />
                    <ListItemButton>
                        <ListItemText>
                            Categories
                        </ListItemText>
                    </ListItemButton>
                    <MiddleDivider />
                    <ListItemButton>
                        <ListItemText>
                            Products
                        </ListItemText>
                    </ListItemButton>
                    <MiddleDivider />
                    <ListItemButton>
                        <ListItemText>
                            About Us
                        </ListItemText>
                    </ListItemButton>
                    <MiddleDivider />
                    <ListItemButton>
                        <ListItemText>
                            Contact Us
                        </ListItemText>
                    </ListItemButton>
                    <MiddleDivider />
                    <ListItemButton onClick={handleLogout}>
                        <ListItemText>
                            Logout
                        </ListItemText>
                    </ListItemButton>
                    <MiddleDivider />
                </List>
            </Drawer>
        </>
    )
}