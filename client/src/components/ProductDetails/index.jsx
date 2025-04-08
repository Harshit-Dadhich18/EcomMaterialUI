import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import Slide from '@mui/material/Slide';
import { useUIContext } from '../context/ui';
import { autocompleteClasses, Box, styled, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import { ProductImage, Products } from '../../styles/Products';
import Rating from '@mui/material/Rating';
import Alert from '@mui/material/Alert';
import { useCart } from '../../hooks/useCart';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProductDetailWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    padding: theme.spacing(4)
}));

const ProductDetailInfoWrapper = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 500,
    lineHeight: 1.5,
}))

export default function FullScreenDialog() {
    const { openDialog, setOpenDialog, productDetails } = useUIContext();
    const [order, setOrder] = React.useState(1);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const { addToCart, addToCartText } = useCart(productDetails);
    const handleClose = () => {
        setOpenDialog(false);
    };
    if (order === -1) {
        <Alert severity="warning">Order reached its lowest value</Alert>
        setOrder(1)
    }
    // console.log("productqunatity",productDetails.quantity);

    const handleOrder = () => {
        if (order < productDetails.quantity) {
            setOrder(order + 1)
        }
    }
    return (
        <React.Fragment>
            <Dialog
                fullScreen
                open={openDialog}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Product Info
                        </Typography>
                        <Button autoFocus color="inherit" onClick={addToCart}>
                            {addToCartText}
                        </Button>
                    </Toolbar>
                </AppBar>
                <ProductDetailWrapper flexDirection={matches ? 'column' : 'row'}>
                    <Products sx={{ mr: 4 }}>
                        <ProductImage src={productDetails.image} />
                    </Products>
                    <ProductDetailInfoWrapper>
                        {/* Product ID and Availability */}
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                                My Bags
                            </Typography>
                            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                Availability: <strong>{productDetails.quantity} in Stock</strong>
                            </Typography>
                        </Box>

                        {/* Product Name */}
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 'bold',
                                mb: 2,
                                color: 'text.primary',
                                textTransform: 'uppercase', // Make product name more prominent
                            }}
                        >
                            {productDetails.name}
                        </Typography>

                        {/* Product Rating */}
                        <Box sx={{ mb: 3 }}>
                            <Rating
                                name="product-rating"
                                defaultValue={3}
                                precision={0.5}
                                readOnly
                                sx={{ color: '#ff9800' }} // Gold color for rating stars
                            />
                        </Box>

                        {/* Product Price */}
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#4caf50' }}>
                            ${productDetails.price}
                        </Typography>

                        {/* Product Description */}
                        <Card sx={{ p: 2, backgroundColor: '#f5f5f5', boxShadow: 2 }}>
                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                Each handbag is meticulously crafted from high-quality materials, ensuring durability and a long-lasting finish.
                                From soft leather to sleek faux leather, we offer a range of options to suit your preference for texture and feel.
                            </Typography>
                        </Card>

                        <Box
                            sx={{
                                width: '15rem',
                                height: 50,
                                borderRadius: 1,
                                display: "flex",
                                background: "white"
                            }}
                        >
                            <Button variant="contained" sx={{ width: '3em', height: '3em' }} onClick={() => handleOrder()}>+</Button>
                            <Typography variant="h6" sx={{ width: '3em', height: '3em', display: 'flex', alignItems: 'top', justifyContent: 'center' }}>{order}</Typography>
                            <Button variant="contained" sx={{ width: '3em', height: '3em' }} onClick={() => setOrder(order - 1)}>-</Button>
                        </Box>
                    </ProductDetailInfoWrapper>
                </ProductDetailWrapper>
            </Dialog>
        </React.Fragment>
    );
}
