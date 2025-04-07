import Avatar from '@mui/material/Avatar';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography } from "@mui/material";
import { ProfileContainer } from "../../styles/Profile";
import OrderSummary from "./OrderSummary";
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from "react";
import axios from "axios";
import { useUIContext } from "../context/ui";

export default function Profile() {
    const { userDetails,showProfile, setShowProfile,orderSummaryArray, setOrderSummaryArray,orderPlaced } = useUIContext();

    const userID = userDetails._id;
    // console.log("userID",userID);

    const handleCancelOrder = async (orderId) => {
        const userOrderID = orderSummaryArray._id; 
        try {
            const response = await axios.delete(`http://localhost:3000/api/order/delete`, {
                data: { orderId, userOrderID }, // Sending both IDs in the request body
            });

            if (response.data.success) {
                const data  = response.data;
                // console.log('Order deleted successfully',response.data);
                // After deleting, you might want to re-fetch the orders or remove it from the state
                setOrderSummaryArray(data.order); // Update the state with the new order data
            } else {
                console.log('Failed to delete the order');
            }
        } catch (error) {
            console.log('Error deleting order:', error);
        }
    };

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                // Send userID in the query string as part of the URL
                const response = await fetch(`http://localhost:3000/api/order/getdata/${userID}`);
                const data = await response.json();
                // console.log("data", data.orders);
                if (data.success) {
                    setOrderSummaryArray(data.orders);
                } else {
                    console.log('No orders found for this user');
                }
            } catch (error) {
                console.log('Failed to fetch order data');
            }
        };

        fetchOrderData();
    }, [userID,orderPlaced]);
    
    return (
        <Slide direction="up" in={showProfile} timeout={500}>
            <ProfileContainer>
                <IconButton
                    onClick={() => setShowProfile(false)}
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        zIndex: 1000, // Ensuring the close button is on top
                    }}
                >
                    <CloseIcon sx={{ fontSize: '2.5rem' }} color="secondary" />
                </IconButton>

                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    sx={{
                        width: '100%',
                        height: '100%',
                        padding: '20px',
                        justifyContent: 'center',
                        overflow: 'hidden',
                    }}
                >
                    {/* Avatar and User Info */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: {
                                xs: 'column',  // Stack vertically on extra small screens (mobile)
                                sm: 'row',     // Stack horizontally on small and above (tablet and up)
                            },
                            alignItems: 'center',
                            textAlign: 'center',
                            marginLeft: {md:'150px'},
                            padding: '20px',
                            gap: '20px', // To create space between avatar and text

                            // Optionally, you can adjust the width based on the screen size
                            width: '100%',
                        }}
                    >
                        <Avatar
                            alt="User Avatar"
                            src="/profile.PNG" // Dynamic profile image would be set here
                            sx={{
                                // Use percentage for better scaling across devices
                                height: {
                                    xs: '20%',    // For mobile devices, you can use percentages for responsive size
                                    sm: '10vh',   // On larger screens, a fixed value like '10vh' can be used
                                    md: '12vh',    // Adjust for medium screens
                                },
                                width: {
                                    xs: '20%',    // Percentage for mobile
                                    sm: '10vw',   // Fixed value for larger screens
                                    md: '6vw',    // Adjust for medium screens
                                },
                                borderRadius: '50%', // Ensures the avatar stays round
                                marginBottom: {
                                    xs: '10px',  // Margin for mobile screens
                                    sm: '0',     // No margin on larger screens
                                },
                            }}
                        />
                        <Box sx={{ width: '100%', marginBottom: '20px', }} >
                            {/* Name and Email */}
                            <Box display="flex" sx={{ marginBottom: '10px' }}>
                                <Typography variant="h6" color="secondary" sx={{ fontWeight: 500, paddingRight: '10px' }}>Name:</Typography>
                                <Typography variant="h6" color="secondary">{userDetails.name}</Typography>
                            </Box>
                            <Box display="flex">
                                <Typography variant="h6" color="secondary" sx={{ fontWeight: 500, paddingRight: '10px' }}>Email:</Typography>
                                <Typography variant="h6" color="secondary">{userDetails.email}</Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Order Summary Section */}
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} sx={{ width: '100%' }}>
                        <Typography variant="h3" color='wheat' sx={{ marginBottom: '20px', fontWeight: 600 }}>
                            Order Summary
                        </Typography>
                        {orderSummaryArray && orderSummaryArray.orderDetails ? (<><Typography variant="body1" color='wheat' sx={{ marginBottom: '20px', fontWeight: 600 }}>
                            Total : ${orderSummaryArray.totalPrice}
                        </Typography>
                        <Grid container spacing={4} justifyContent="center" alignItems="center">
                            {orderSummaryArray.orderDetails.map((order, index) => (

                                <Grid item key={index} xs={12} sm={6} md={4}>
                                    <OrderSummary order={order} onCancelOrder={handleCancelOrder} />
                                </Grid>

                            ))}
                        </Grid> </>) : (
                            <Typography variant="h6" color="wheat" sx={{ marginTop: '20px' }}>
                                No orders available.
                            </Typography>
                        )}
                    </Box>
                </Box>
            </ProfileContainer>
        </Slide>
    );
}
