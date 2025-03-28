import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';

const ConfirmStep = ({ orderDetails, selectedAddress }) => {
  return (
    <Paper elevation={0} sx={{ p: 3 }}>
      {/* Product Details */}
      <Typography variant="h6" gutterBottom>
        Order Details
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          {orderDetails.productName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Quantity: {orderDetails.quantity}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {orderDetails.category}
        </Typography>
        <Typography variant="h6" color="error" sx={{ mt: 1 }}>
          Total Price: ₹ {orderDetails.totalAmount}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Address Details */}
      <Typography variant="h6" gutterBottom>
        Address Details
      </Typography>
      {selectedAddress && (
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            {selectedAddress.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Contact: {selectedAddress.contactNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedAddress.street}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedAddress.city}, {selectedAddress.state}
          </Typography>
          {selectedAddress.landmark && (
            <Typography variant="body2" color="text.secondary">
              Landmark: {selectedAddress.landmark}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            ZIP Code: {selectedAddress.zipCode}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default ConfirmStep; 