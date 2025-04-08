import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import {Colors} from '../../src/styles/theme'

const MockData = [{
  name: 'Total Customers',
  value: 100,
  image: '/users.jpg'
},
{
  name: 'Total Orders',
  value: 200,
  image: '/orders.jpg'
},
{
  name: 'Total Revenue',
  value: '$5000',
  image: '/revenue.jpg'
},
{
  name: 'Total Products',
  value: 50,
  image: '/products1.jpg'
}];

export default function Dashboard() {
  return (
    <>
      <Typography
      color={Colors.primary }
        sx={{
          mb: 3, // Add bottom margin
          mt: 6, // Add top margin
          textAlign: 'center', // Center the title
          fontWeight: 'bold', // Make the text bold
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, // Make the font size responsive
          
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // Add subtle text shadow
          letterSpacing: 2, // Add spacing between letters for style
        }}
        variant="h4"
      >
        Dashboard [MOCK DATA]
      </Typography>

      {/* Grid container for 2 cards in each row */}
      <Grid container spacing={3} justifyContent="center">
        {MockData.map((data, index) => (
          <Grid size={6} key={index}>
            <Card variant="outlined" sx={{ height: 300 }}>
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent:'flex-end',
                  backgroundImage: `url(${data.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '100%',
                  color: 'white',  // Ensures text is white for contrast on dark backgrounds
                  padding: 2,
                  boxShadow: 3,
                }}
              >
                <Typography gutterBottom color={Colors.secondary} >
                  {data.name}
                </Typography>
                <Typography variant="h4" sx={{ mb: 1.5,color:Colors.secondary }}>
                  {data.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
