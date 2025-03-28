import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
  Autocomplete,
  CircularProgress,
} from '@mui/material';

const categories = ['Apparel', 'Electronics', 'Footwear', 'Personal Care', 'Furniture'];

const ModifyProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    manufacturer: '',
    availableItems: '',
    price: '',
    imageUrl: '',
    description: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`/products/${id}`);
      if (!response.ok) throw new Error('Failed to fetch product details');
      const data = await response.json();
      setFormData(data);
    } catch (err) {
      setError('Failed to fetch product details');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      category: newValue,
    }));
  };

  const validateForm = () => {
    const required = ['name', 'category', 'manufacturer', 'availableItems', 'price'];
    const missing = required.filter(field => !formData[field]);
    if (missing.length > 0) {
      setError(`Please fill in all required fields: ${missing.join(', ')}`);
      return false;
    }
    if (isNaN(formData.price) || formData.price <= 0) {
      setError('Price must be a positive number');
      return false;
    }
    if (isNaN(formData.availableItems) || formData.availableItems < 0) {
      setError('Available items must be a non-negative number');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch(`/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to modify product');
      }

      setSuccessMessage(`Product ${formData.name} modified successfully`);
      setTimeout(() => {
        navigate('/products');
      }, 2000);
    } catch (err) {
      setError('Failed to modify product. Please try again.');
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Modify Product
        </Typography>

        <Box component="form" sx={{ mt: 3 }}>
          <TextField
            required
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <Autocomplete
            freeSolo
            options={categories}
            value={formData.category}
            onChange={handleCategoryChange}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Category"
                name="category"
                sx={{ mb: 2 }}
              />
            )}
          />

          <TextField
            required
            fullWidth
            label="Manufacturer"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <TextField
            required
            fullWidth
            label="Available Items"
            name="availableItems"
            type="number"
            value={formData.availableItems}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <TextField
            required
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Product Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={4}
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: '#3f51b5',
              '&:hover': { backgroundColor: '#303f9f' },
            }}
          >
            MODIFY PRODUCT
          </Button>
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

      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ModifyProduct; 