import { styled } from "@mui/system";
import { Colors } from "../theme";
import { Box } from "@mui/system";

export const ProfileContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left:0,
    width: '100%',
    minHeight: "100vh",
    background: Colors.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    opacity: 1,
}));

export const ProfileBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.white,
    padding: '2vw',
}))