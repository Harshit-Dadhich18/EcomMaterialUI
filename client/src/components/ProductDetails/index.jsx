import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { useUIContext } from '../context/ui';
import { autocompleteClasses, Box, styled, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import { ProductImage, Products } from '../../styles/Products';
import Rating from '@mui/material/Rating';
import Alert from '@mui/material/Alert';

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
    const [order,setOrder] = React.useState(0);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const handleClose = () => {
        setOpenDialog(false);
    };
    if(order === -1){
        <Alert severity="warning">Order reached its lowest value</Alert>
        setOrder(0)
    }
    // console.log("productqunatity",productDetails.quantity);

    const handleOrder = () => {
        if(order < productDetails.quantity ){
        setOrder(order +1)
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
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Add to Cart
                        </Button>
                    </Toolbar>
                </AppBar>
                <ProductDetailWrapper flexDirection={matches ? 'column' : 'row'}>
                    <Products sx={{ mr: 4 }}>
                        <ProductImage src={productDetails.image} />
                    </Products>
                    <ProductDetailInfoWrapper>
                        <Typography variant="subtitle1">HD 123</Typography>
                        <Typography variant="subtitle1">
                            Availability: 5 in Stock
                        </Typography>
                        <Typography sx={{
                            lineHeight: 2
                        }} variant="h4" >
                            {productDetails.name}
                        </Typography>
                        <Rating
                            name="simple-uncontrolled"
                            defaultValue={3}
                        />
                        <Typography variant="h6">
                            ${productDetails.price}
                        </Typography>
                        <Typography variant="body">
                            Each handbag is meticulously crafted from high-quality materials, ensuring durability and a long-lasting finish. From soft leather to sleek faux leather, we offer a range of options to suit your preference for texture and feel.
                        </Typography>
                        <Box
                            sx={{
                                width: '15rem',
                                height: 50,
                                borderRadius: 1,
                                display: "flex",
                                background: "white"
                            }}
                        >
                            <Button variant="contained" sx={{width: '3em', height:'3em'}} onClick={()=> handleOrder()}>+</Button>
                            <Typography variant="h6" sx={{width: '3em', height:'3em', display:'flex', alignItems:'top', justifyContent:'center'}}>{order}</Typography>
                            <Button variant="contained" sx={{width: '3em', height:'3em'}} onClick={()=> setOrder(order -1)}>-</Button>
                        </Box>
                    </ProductDetailInfoWrapper>
                </ProductDetailWrapper>
            </Dialog>
        </React.Fragment>
    );
}
