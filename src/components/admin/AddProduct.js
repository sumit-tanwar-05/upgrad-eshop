import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';

const AddProduct = () => {
  const [product, setProduct] = useState({ name: '', price: '', category: '' });
  const navigate = useNavigate();

  const handleAddProduct = () => {
    fetch('/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then(() => {
        alert(`Product ${product.name} added successfully!`);
        navigate('/admin');
      })
      .catch((err) => console.error('Error adding product:', err));
  };

  return (
    <Box p={3} className="add-product">
      <Typography variant="h4" gutterBottom>
        Add Product
      </Typography>
      <TextField
        label="Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Price"
        type="number"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Category"
        value={product.category}
        onChange={(e) => setProduct({ ...product, category: e.target.value })}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleAddProduct}>
        Add Product
      </Button>
    </Box>
  );
};

export default AddProduct;
