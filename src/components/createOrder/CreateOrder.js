import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './createOrder.css';

const CreateOrder = () => {
  const steps = ['Product Details', 'Address Details', 'Order Confirmation'];
  const [activeStep, setActiveStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (activeStep === 1 && !selectedAddress) {
      alert('Please select an address!');
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleConfirmOrder = () => {
    alert('Your order is confirmed.');
    navigate('/products');
  };

  return (
    <Box p={3} className="create-order">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Box p={2}>
          <Typography variant="h6">Product Details</Typography>
          <Typography>Name: Sample Product</Typography>
          <Typography>Price: ₹1000</Typography>
        </Box>
      )}

      {activeStep === 1 && (
        <Box p={2}>
          <Typography variant="h6">Address Details</Typography>
          <TextField
            select
            label="Select Address"
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          >
            {addresses.map((address) => (
              <MenuItem key={address.id} value={address.id}>
                {address.street}, {address.city}, {address.state}
              </MenuItem>
            ))}
          </TextField>
          <Typography>Add New Address</Typography>
          <TextField
            label="New Address"
            fullWidth
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setAddresses([...addresses, { id: newAddress, street: newAddress }]);
              setNewAddress('');
            }}
          >
            Save Address
          </Button>
        </Box>
      )}

      {activeStep === 2 && (
        <Box p={2}>
          <Typography variant="h6">Order Confirmation</Typography>
          <Typography>Product: Sample Product</Typography>
          <Typography>Total: ₹1000</Typography>
        </Box>
      )}

      <Box mt={2} display="flex" justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button variant="contained" color="primary" onClick={handleConfirmOrder}>
            Confirm Order
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CreateOrder;
