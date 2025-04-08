import React from 'react'
import { Avatar, Box, Button, Divider, Drawer, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Colors } from '../../styles/theme';
import { useUIContext } from '../context/ui/index.jsx';
import CloseButton from './CloseButton.jsx';
import OrderButton from './OrderButton.jsx';

const Cart = () => {
    const { cart,
        showCart,
        setCart,
        setShowCart,
        setNotifications,
        setNotificationMessage,
        setNotificationColor } = useUIContext();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const handleCart = (item) => {
        setCart(cart.filter(c => c._id !== item._id))
    }
    const cartContent = cart.map((item) => (
        <Box key={item._id}>
            <Box
                display="flex"
                sx={{ pt: 2, pb: 2 }}
                alignItems="start"
                justifyContent="space-between">
                <Avatar src={item.image} sx={{ width: 96, height: 96, mr: 2 }} />
                <Box display="flex" flexDirection="column">
                    <Typography variant="h6">{item.name}</Typography>
                    {!matches && <Typography variant="subtitle2">{item.description}</Typography>}
                </Box>
                <Typography variant="body1" justifyContent={"end"}>
                    ${item.price}
                </Typography>
            </Box>
            {matches && <Typography variant="subtitle2">{item.description}</Typography>}
            <Button onClick={() => handleCart(item)} variant="contained" sx={{ width: "100%", mt: 1 }}>Remove Item</Button>
            <Divider variant="inset" />
        </Box>
    ))

    const ordersuccess = () => {
        setNotificationMessage("Order placed!");
        setNotificationColor(Colors.success);
        setNotifications(true);
        setShowCart(false);
        setCart([]);
    }
    return (
        <Drawer
            open={showCart}
            anchor="right"
            PaperProps={{
                sx: {
                    width: matches ? "100%" : 500,
                    background: Colors.light_gray,
                    borderRadius: 0
                }
            }}>
            {cart.length > 0 ? (<Box
                sx={{ p: 4 }}
                display="flex"
                justifyContent={"center"}
                flexDirection="column"
                alignItems="center">
                <Box display={"flex"} justifyContent={"space-between"} sx={{ width: "100%", mb: 2 }}>
                    <Typography variant="h4" color={Colors.black}>Your Cart</Typography>
                    <CloseButton />
                </Box>
                <Typography variant="body1" color={Colors.muted}>
                    {" "}
                    Unleash elegance and sophistication with our premium collection.
                </Typography>
                <Typography variant="subtitle1">Total Items: {cart.length}</Typography>
                <Paper
                    elevation={0}
                    sx={{
                        mt: 2,
                        width: "90%",
                        padding: 4,
                    }}>
                    {cartContent}
                </Paper>
                <OrderButton cart={cart} ordersuccess={ordersuccess} />
            </Box>) :
                <Box
                    sx={{ p: 4 }}
                    display="flex"
                    justifyContent={"center"}
                    flexDirection="column"
                    alignItems="center">
                    <Typography variant={matches ? "h4" : "h3"} color={Colors.black} sx={{ mb: 2 }}>
                        Your cart is empty!
                    </Typography>
                    <CloseButton />
                </Box>}
        </Drawer>
    )
}

export default Cart