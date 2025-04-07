import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Colors, DrawerWidth } from "../../src/styles/theme"
import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavDrawer from './NavDrawer'

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${DrawerWidth}px`,
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    marginLeft: 0,
                },
            },
        ],
    }),
);


export default function AdminApp() {
    const [open, setOpen] = useState(true);

    return (
        <Box sx={{
            display: 'flex',
            background: Colors.background,
            height: '100vh'
        }}>
            <NavDrawer open={open} setOpen={setOpen} />
            <Main open={open}>
                <Outlet />
            </Main>
        </Box>
    )
}