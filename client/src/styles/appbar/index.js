import { List, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box} from "@mui/system";
import { Colors } from "../theme";
import "@fontsource/montez"
import { IconButton } from "@mui/material";

export const AppbarContainer = styled(Box)(()=>({
    display: 'flex',
    marginTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2px 8px'
}));

//header
export const AppbarHeader = styled(Typography)(()=>({
    padding: '4px',
    flexGrow: 1,
    fontSize: '4em',
    fontFamily: '"Montez","cursive"',
    color: Colors.secondary
}))

export const MyList = styled(List)(({type})=> ({
    display: type === 'row' ? 'flex' : 'block',
    flexGrow: 3,
    justifyContent: 'center',
    alignItems: 'center'
}))

export const ActionIconsContainerMobile = styled(Box)(()=> ({
    display: 'flex',
    background: Colors.shaft,
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    alignItems: 'center',
    zIndex: 99,
    borderTop: `1px solild ${Colors.border}`
}))

export const ActionIconsContainerDesktop = styled(Box)(()=> ({
    flexGrow : 0
}));

export const DrawerCloseButton = styled(IconButton)(()=> ({
    position: 'absolute',
    top: 10,
    left: '250px',
    zIndex: 1999
}));

export const HomeBarText = styled(Typography)(()=> ({ 
    flexGrow: 1, 
    display: { xs: 'none', sm: 'block' },
    fontWeight: 'bold', 
    color: '#707070', 
    cursor: 'pointer',
    position: 'relative', // To allow for positioning of the underline
    display: 'inline-block', // Make it inline so the width matches the text
    '&:hover': {
      color: '#424242', // Optional color change on hover
    },
    // Create the underline using '::after' pseudo-element
    '&::after': {
      content: '""', // Empty content for the underline
      position: 'absolute', // Position it below the text
      bottom: 0, // Position at the bottom of the text
      left: 0,
      width: '100%', // Full width of the text (should match the text width)
      height: '2px', // Thickness of the underline
      backgroundColor: '#424242', // Color of the underline
      transform: 'scaleX(0)', // Initially scale the underline to 0 (hidden)
      transformOrigin: 'bottom left', // Start the scaling from the right
      transition: 'transform 0.3s ease', // Smooth transition for the underline
    },
    // On hover, make the underline visible
    '&:hover::after': {
      transform: 'scaleX(0.5)', // Scale the underline to full width
      transformOrigin: 'bottom left', // Start the scaling from the left on hover
    },
}))