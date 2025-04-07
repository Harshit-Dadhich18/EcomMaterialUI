import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function OrderSummary({ order, onCancelOrder }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        width: '100%', // Full width on mobile
        margin: 'auto', // Center the card on smaller screens
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '@media (min-width: 600px)': {
          width: '500px', // Larger width on small screens (tablets and up)
        },
        '@media (min-width: 960px)': {
          width: '600px', // Even larger width on desktop screens
        },
      }}
    >
      <CardMedia
        component="img"
        alt={order.name}
        image={order.image}
        sx={{
          width: '100%', // Full width for mobile
          height: 'auto', // Automatic height based on image aspect ratio
          objectFit: 'cover', // Ensures the image covers the container without distortion
          maxHeight: 300, // Optionally limit the max height of the image
          transition: 'transform 0.3s ease', // Smooth zoom transition
          '&:hover': {
            transform: 'scale(1.1)', // Slight zoom on hover
          },
        }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            textAlign: 'center', // Center the title for better mobile view
            fontSize: { xs: '1.2rem', sm: '1.5rem' }, // Responsive font size
          }}
        >
          {order.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
          Price : ${order.price}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            textTransform: 'capitalize',
            fontSize: { xs: '0.875rem', sm: '1rem' }, // Font size adjustment for mobile
          }}
        >
          Quantity: {order.orderQuantity}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            textTransform: 'capitalize',
            fontSize: { xs: '0.875rem', sm: '1rem' },
          }}
        >
          Status: {order.status}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          size="small"
          variant="contained"
          sx={{
            width: { xs: '100%', sm: 'auto' }, // Full width on mobile, auto width on desktop
            padding: { xs: '8px 16px', sm: '10px 20px' }, // Button padding for mobile and desktop
          }}
          onClick={() => onCancelOrder(order._id)} >
          Cancel Order
        </Button>
      </CardActions>
    </Card>
  );
}
