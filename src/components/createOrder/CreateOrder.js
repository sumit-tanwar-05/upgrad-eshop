import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Stepper,
  Step,
  StepLabel,
  Container,
  Paper,
  Box,
  Typography,
  Button,
  Alert,
  Snackbar,
} from '@mui/material';
import ItemsStep from './steps/ItemsStep';
import AddressStep from './steps/AddressStep';
import ConfirmStep from './steps/ConfirmStep';

const steps = ['Items', 'Select Address', 'Confirm Order'];

const CreateOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [orderDetails, setOrderDetails] = useState(location.state || {});
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleNext = () => {
    if (activeStep === 1 && !selectedAddress) {
      setError('Please select address!');
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
    setError('');
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setError('');
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setError('');
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        productId: orderDetails.productId,
        quantity: orderDetails.quantity,
        addressId: selectedAddress.id,
      };

      const response = await fetch('/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      setSuccessMessage('Order placed successfully!');
      setTimeout(() => {
        navigate('/products');
      }, 2000);
    } catch (err) {
      setError('Failed to place order. Please try again.');
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ItemsStep orderDetails={orderDetails} />;
      case 1:
        return (
          <AddressStep
            selectedAddress={selectedAddress}
            onAddressSelect={handleAddressSelect}
          />
        );
      case 2:
        return (
          <ConfirmStep
            orderDetails={orderDetails}
            selectedAddress={selectedAddress}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {getStepContent(activeStep)}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handlePlaceOrder}
              sx={{
                backgroundColor: '#3f51b5',
                '&:hover': { backgroundColor: '#303f9f' },
              }}
            >
              Place Order
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                backgroundColor: '#3f51b5',
                '&:hover': { backgroundColor: '#303f9f' },
              }}
            >
              Next
            </Button>
          )}
        </Box>
      </Paper>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={2000}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateOrder;
