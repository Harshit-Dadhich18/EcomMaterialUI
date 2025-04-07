import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Colors } from '../styles/theme';
import { FooterTitle, SubscribeTf } from '../styles/footer';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

export default function Footer() {
    return (
        <Box sx={{
            background: Colors.shaft,
            color: Colors.white,
            p: { xs: 4, md: 10 },
            pt: 12,
            pb: 12,
            fontSize: { xs: "12px", md: "14px" },
        }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid size={{ xs: 6, md: 3 }}>
                    <FooterTitle variant="body1">
                        About Us
                    </FooterTitle>
                    <Typography variant='caption2'>
                    At My Bags, we offer a curated collection of stylish and functional handbags designed to elevate every woman's look. Explore our selection and find the perfect bag to complement your unique style!
                    </Typography>
                    <Box sx={{
                    mt: 4,
                    color: Colors.dove_gray
                }}>
                    <FacebookIcon sx={{mr: 1}} />
                    <XIcon sx={{mr: 1}} />
                    <InstagramIcon />
                </Box>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                <FooterTitle variant='body1'>
                    information
                </FooterTitle>
                    <ListItemText>
                        <Typography lineHeight={2} variant='caption2'>
                            Order Tracking
                        </Typography>
                    </ListItemText>
                    <ListItemText>
                        <Typography lineHeight={2} variant='caption2'>
                            Contact Us
                        </Typography>
                    </ListItemText>
                    <ListItemText>
                        <Typography lineHeight={2} variant='caption2'>
                            Privacy &amp; Policy
                        </Typography>
                    </ListItemText>
                    <ListItemText>
                        <Typography lineHeight={2} variant='caption2'>
                            Terms &amp; Conditions
                        </Typography>
                    </ListItemText>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                <FooterTitle variant='body1'>
                    my account
                </FooterTitle>
                    <ListItemText>
                        <Typography lineHeight={2} variant='caption2'>
                            Login
                        </Typography>
                    </ListItemText>
                    <ListItemText>
                        <Typography lineHeight={2} variant='caption2'>
                            My Cart
                        </Typography>
                    </ListItemText>
                    <ListItemText>
                        <Typography lineHeight={2} variant='caption2'>
                            My Account
                        </Typography>
                    </ListItemText>
                    <ListItemText>
                        <Typography lineHeight={2} variant='caption2'>
                            Wishlist
                        </Typography>
                    </ListItemText>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                <FooterTitle variant='body1'>
                    newsletter
                    </FooterTitle>
                    <Stack>
                        <SubscribeTf
                            color="primary"
                            label="Enter your email address"
                            variant="standard" />
                                <Button 
                                    startIcon={<SendIcon 
                                    sx={{ color: Colors.white}}/>} sx={{ mt:4, mb: 4}} variant='contained' >
                                        Subscribe
                                    </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}