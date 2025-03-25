import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import './productDetails.css';

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); // State to store product details
  const [quantity, setQuantity] = useState(1); // State to store quantity
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product details from the API
    fetch(`/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product details:', error));
  }, [id]);

  if (!product) {
    return <Typography>Loading product details...</Typography>;
  }

  const handlePlaceOrder = () => {
    navigate('/create-order');
  };

  return (
    <Box p={3} className="product-details">
      <Typography variant="h4" gutterBottom>
        {product.name}
      </Typography>
      <Box className="product-image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <Typography>No image available</Typography>
        )}
      </Box>
      <Typography variant="body1" gutterBottom>
        {product.description}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Price: ₹{product.price}
      </Typography>
      <Box mt={2} className="quantity-section">
        <TextField
          type="number"
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          inputProps={{ min: 1 }}
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetails;
