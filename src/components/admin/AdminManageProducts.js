import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Button, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import './AdminManageProducts.css';

const AdminManageProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from API
    fetch('/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  const handleDelete = (id) => {
    // Delete product from API
    fetch(`/products/${id}`, { method: 'DELETE' })
      .then(() => {
        alert('Product deleted successfully!');
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((err) => console.error('Error deleting product:', err));
  };

  return (
    <Box p={3} className="admin-manage-products">
      <Typography variant="h4" gutterBottom>
        Manage Products
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/add-product')}
        sx={{ mb: 2 }}
      >
        Add Product
      </Button>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {products.map((product) => (
          <Card key={product.id} className="product-card">
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography>Price: ₹{product.price}</Typography>
              <Typography>Category: {product.category}</Typography>
            </CardContent>
            <CardActions>
              <IconButton color="primary" onClick={() => navigate(`/edit-product/${product.id}`)}>
                <EditIcon />
              </IconButton>
              <IconButton color="secondary" onClick={() => handleDelete(product.id)}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AdminManageProducts;
