import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField";
import { Colors } from "../theme";

export const FooterTitle = styled(Typography)(()=> ({
    textTransform: 'uppercase',
    marginBottom: '1em',
}));

export  const SubscribeTf = styled(TextField)(()=> ({
    '.MuiInputLabel-root': {
        color: Colors.secondary
    },
    '.MuiInout-root': {
        borderBottom: `1px solid ${Colors.secondary}`
    },
}));