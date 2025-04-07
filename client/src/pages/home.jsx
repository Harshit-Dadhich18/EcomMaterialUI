import Container from '@mui/material/Container';
import theme from '../styles/theme';
import { ThemeProvider } from '@emotion/react';
import Appbar from '../components/appbar';
import Banner from '../components/banner';
import Promotions from '../components/promotions';
import Products from '../components/products';
import { Box, Typography } from '@mui/material';
import SearchBox from '../components/search';
import { UIProvider } from '../components/context/ui';
import ProductDetails from '../components/ProductDetails';
import AppDrawer from '../drawer';
import Chatbot from '../../chatbot';
import Footer from '../footer';
import Cart from '../components/cart';
import Profile from '../components/Profile';
import ContactUs from '../components/contactUs';
export default function Home() {
    return (
        <ThemeProvider theme={theme}>
            <Container
                maxWidth='xl'
                sx={{
                    background: '#fff'
                }}>
                {/* <UIProvider> */}
                    <Appbar />
                    <Banner />
                    <Promotions />
                    <Box display="flex" justifyContent="center" sx={{ margin: '20px 0px' }}>
                        <Typography variant='h4'>
                            Our Products
                        </Typography>
                    </Box>
                    <Products />
                    <AppDrawer />
                    <Cart />
                    <SearchBox />
                    <ProductDetails />
                    <Chatbot />
                    <Footer />
                    <Profile />
                    <ContactUs />
                {/* </UIProvider> */}
            </Container>
        </ThemeProvider>
    )
}