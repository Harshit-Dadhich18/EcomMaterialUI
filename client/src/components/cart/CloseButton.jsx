import { Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Colors } from "../../styles/theme";
import CancelIcon from '@mui/icons-material/Cancel';
import { useUIContext } from "../context/ui";

// Styled button with Material UI
const NeumorphismButton = styled(Button)(({ theme }) => ({
  padding: '6px 12px', // Reduced padding for a more compact button
  borderRadius: '50px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px', // Reduced gap between text and icon
  color: theme.palette.text.secondary,
  boxShadow: `-5px -5px 10px rgba(255, 255, 255, 0.8), 5px 5px 10px rgba(0, 0, 0, 0.25)`,
  transition: 'all 0.3s',
  '&:hover': {
    boxShadow: `-1px -1px 5px rgba(255, 255, 255, 0.6), 1px 1px 5px rgba(0, 0, 0, 0.3), inset -2px -2px 5px rgba(255, 255, 255, 1), inset 2px 2px 4px rgba(0, 0, 0, 0.3)`,
    color: Colors.primary,
  },
}));

// Wrapper for the button
const CloseButton = () => {
  const { setShowCart } = useUIContext();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <NeumorphismButton endIcon={<CancelIcon />} onClick={() => setShowCart(false)}>
        <Typography sx={{ fontSize: '14px' }}>Close</Typography> {/* Adjust text size if needed */}
      </NeumorphismButton>
    </Box>
  );
};

export default CloseButton;
