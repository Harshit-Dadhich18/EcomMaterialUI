import React from "react";
import { Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useUIContext } from "../context/ui"
import axios from "axios";


const OrderButton = ({cart, ordersuccess}) => {
  const {userDetails,setOrderSummaryArray, setOrderPlaced} = useUIContext();
  console.log("orderDataUserID",userDetails._id);
  const orderData = {
    userId: userDetails._id, // User ID from context
    orderDetails: cart.map(item => ({
      productId: item._id, // Here we use the _id field as the productId
      orderQuantity: item.orderQuantity, // Quantity of the product
      price: item.price, // Price of the product
      name: item.name, // Name of the product
      description: item.description, // Description of the product
      image: item.image, // Product image URL
    })),
  };
  const handleOrder = async() => {
    // console.log("orderData",orderData);
    // Add your order logic here
    try {
      const response = await axios.post("http://localhost:3000/api/order/postdata", orderData, {
        withCredentials: true, // If using cookies for auth
      });
  
      if (response.data.success) {
        const data = response.data;
        // console.log("Order placed successfully", response.data);
        setOrderSummaryArray(data.order);
        setOrderPlaced(true); // Set order placed state to true
        ordersuccess(); // Call the success function to clear the cart
        // Redirect or show success message here
      } else {
        console.log("Order placement failed", response.data.message);
      }
    } catch (error) {
      console.error("Error placing order", error);
    }
     
  }
  
  return (
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        minHeight: '200px',
        padding: '16px',
      }}
      onClick={handleOrder}
    >
      <DrawOutlineButton >Proceed to order</DrawOutlineButton>
    </Box>
  );
};

const DrawOutlineButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  padding: '8px 16px', // Adjust this to make the button more compact
  fontWeight: '500',
  color: theme.palette.text.primary,
  background: 'transparent',
  border: '2px solid transparent', // Initial border is transparent
  outline: 'none',
  cursor: 'pointer',
  textTransform: 'none',
  transition: 'color 400ms ease, border-color 400ms ease',
  '&:hover': {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main, // Add border color on hover
  },
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    backgroundColor: theme.palette.primary.main,
    transition: 'all 100ms ease',
    zIndex: 1,
  },
  '&::before': {
    top: 0,
    left: 0,
    width: 0,
    height: '2px',
    transitionDelay: '0ms',
  },
  '&::after': {
    bottom: 0,
    right: 0,
    height: 0,
    width: '2px',
    transitionDelay: '200ms',
  },
  '&:hover::before': {
    width: '100%', // Expands to full width on hover
  },
  '&:hover::after': {
    height: '100%', // Expands to full height on hover
  },
  '& span': {
    zIndex: 2,
  },
}));

export default OrderButton;
