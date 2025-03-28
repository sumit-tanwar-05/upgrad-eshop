import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Grid,
  Alert,
} from '@mui/material';

const AddressStep = ({ selectedAddress, onAddressSelect }) => {
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [formError, setFormError] = useState('');
  const [newAddress, setNewAddress] = useState({
    name: '',
    contactNumber: '',
    street: '',
    city: '',
    state: '',
    landmark: '',
    zipCode: '',
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await fetch('/addresses');
      if (!response.ok) throw new Error('Failed to fetch addresses');
      const data = await response.json();
      setAddresses(data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleAddressChange = (event) => {
    const address = addresses.find(addr => addr.id === event.target.value);
    onAddressSelect(address);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const required = ['name', 'contactNumber', 'street', 'city', 'state', 'zipCode'];
    const missing = required.filter(field => !newAddress[field]);
    if (missing.length > 0) {
      setFormError(`Please fill in all required fields: ${missing.join(', ')}`);
      return false;
    }
    if (!/^\d{10}$/.test(newAddress.contactNumber)) {
      setFormError('Contact number must be 10 digits');
      return false;
    }
    if (!/^\d{6}$/.test(newAddress.zipCode)) {
      setFormError('ZIP code must be 6 digits');
      return false;
    }
    return true;
  };

  const handleSaveAddress = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch('/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAddress),
      });

      if (!response.ok) throw new Error('Failed to save address');

      const savedAddress = await response.json();
      setAddresses(prev => [...prev, savedAddress]);
      onAddressSelect(savedAddress);
      setShowAddressForm(false);
      setNewAddress({
        name: '',
        contactNumber: '',
        street: '',
        city: '',
        state: '',
        landmark: '',
        zipCode: '',
      });
      setFormError('');
    } catch (error) {
      setFormError('Failed to save address. Please try again.');
    }
  };

  return (
    <Box>
      {/* Address Selection */}
      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Select Address
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Select Address</InputLabel>
          <Select
            value={selectedAddress?.id || ''}
            onChange={handleAddressChange}
            label="Select Address"
          >
            {addresses.map((address) => (
              <MenuItem key={address.id} value={address.id}>
                {address.name} - {address.street}, {address.city}, {address.state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          onClick={() => setShowAddressForm(!showAddressForm)}
          sx={{ mt: 1 }}
        >
          {showAddressForm ? 'Cancel' : 'Add New Address'}
        </Button>
      </Paper>

      {/* Address Form */}
      {showAddressForm && (
        <Paper elevation={0} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Add Address
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Name"
                name="name"
                value={newAddress.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Contact Number"
                name="contactNumber"
                value={newAddress.contactNumber}
                onChange={handleInputChange}
                inputProps={{ maxLength: 10 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Street"
                name="street"
                value={newAddress.street}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="City"
                name="city"
                value={newAddress.city}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="State"
                name="state"
                value={newAddress.state}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Landmark"
                name="landmark"
                value={newAddress.landmark}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="ZIP Code"
                name="zipCode"
                value={newAddress.zipCode}
                onChange={handleInputChange}
                inputProps={{ maxLength: 6 }}
              />
            </Grid>
          </Grid>

          {formError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {formError}
            </Alert>
          )}

          <Button
            variant="contained"
            onClick={handleSaveAddress}
            sx={{
              mt: 3,
              backgroundColor: '#3f51b5',
              '&:hover': { backgroundColor: '#303f9f' },
            }}
          >
            Save Address
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default AddressStep; 