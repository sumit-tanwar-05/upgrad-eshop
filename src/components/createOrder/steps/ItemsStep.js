import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ItemsStep = ({ orderDetails }) => {
  return (
    <Paper elevation={0} sx={{ p: 3 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          {orderDetails.productName}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Quantity: {orderDetails.quantity}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Category: {orderDetails.category}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {orderDetails.description}
        </Typography>
        <Typography variant="h6" color="error">
          Total Price: ₹ {orderDetails.totalAmount}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ItemsStep; 