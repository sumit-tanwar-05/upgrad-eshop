import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Container,
  Paper,
  CircularProgress,
} from '@mui/material';
import './productDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (value > 0 && (!product?.availableQuantity || value <= product.availableQuantity)) {
      setQuantity(value);
    }
  };

  const handlePlaceOrder = () => {
    if (product && quantity > 0) {
      navigate('/create-order', {
        state: {
          productId: product.id,
          quantity: quantity,
          totalAmount: product.price * quantity
        }
      });
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="error">
          {error || 'Product not found'}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={0} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Product Image */}
          <Box sx={{ flex: '0 0 400px' }}>
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={`${product.name} product`}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  maxHeight: '400px'
                }}
              />
            ) : (
              <Box 
                sx={{ 
                  width: '100%', 
                  height: '400px', 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#f5f5f5'
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  Product image not available
                </Typography>
              </Box>
            )}
          </Box>

          {/* Product Details */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography variant="h4" component="h1">
                {product.name}
              </Typography>
              {product.availableQuantity && (
                <Chip
                  label={`Available Quantity: ${product.availableQuantity}`}
                  color="primary"
                  size="small"
                />
              )}
            </Box>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Category: {product.category}
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
              {product.description}
            </Typography>

            <Typography
              variant="h5"
              color="error"
              sx={{ mb: 3 }}
            >
              ₹ {product.price}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <TextField
                label="Enter Quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                InputProps={{ 
                  inputProps: { 
                    min: 1, 
                    max: product.availableQuantity || 999999 
                  } 
                }}
                size="small"
                sx={{ width: 150 }}
              />
            </Box>

            <Button
              variant="contained"
              onClick={handlePlaceOrder}
              sx={{
                backgroundColor: '#3f51b5',
                '&:hover': { backgroundColor: '#303f9f' },
                width: 150,
              }}
            >
              PLACE ORDER
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductDetails;
