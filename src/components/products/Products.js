import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Select,
  MenuItem,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './products.css';

const CATEGORIES = ['ALL', 'APPAREL', 'ELECTRONICS', 'FOOTWEAR', 'PERSONAL CARE'];
const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'priceHighToLow', label: 'Price: High to Low' },
  { value: 'priceLowToHigh', label: 'Price: Low to High' },
  { value: 'newest', label: 'Newest' },
];

const Products = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [category, setCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('default');
  const [products, setProducts] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, product: null });
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products');
    }
  };

  const handleCategoryChange = (event, newCategory) => {
    if (newCategory !== null) {
      setCategory(newCategory);
    }
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleEdit = (productId) => {
    navigate(`/modify-product/${productId}`);
  };

  const handleDelete = (product) => {
    setDeleteDialog({ open: true, product });
  };

  const confirmDelete = async () => {
    const product = deleteDialog.product;
    try {
      const response = await fetch(`/products/${product.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setProducts(products.filter(p => p.id !== product.id));
      setSuccessMessage(`Product ${product.name} deleted successfully`);
      setDeleteDialog({ open: false, product: null });
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  const handleBuy = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Filter and sort products
  let filteredProducts = products;
  if (category !== 'ALL') {
    filteredProducts = products.filter(product => product.category === category);
  }

  // Apply sorting
  switch (sortBy) {
    case 'priceHighToLow':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'priceLowToHigh':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'newest':
      // Assuming products have a dateAdded field
      filteredProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      break;
    default:
      // Keep default order
      break;
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Category Filters */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup
          value={category}
          exclusive
          onChange={handleCategoryChange}
          aria-label="category filter"
          sx={{
            backgroundColor: 'white',
            '& .MuiToggleButton-root': {
              textTransform: 'none',
              color: '#666',
              '&.Mui-selected': {
                backgroundColor: '#f0f0f0',
                color: '#000',
              },
            },
          }}
        >
          {CATEGORIES.map((cat) => (
            <ToggleButton key={cat} value={cat}>
              {cat}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/* Sort Dropdown */}
      <Box sx={{ mb: 3 }}>
        <Typography component="span" sx={{ mr: 2 }}>
          Sort By:
        </Typography>
        <Select
          value={sortBy}
          onChange={handleSortChange}
          size="small"
          sx={{ minWidth: 200 }}
        >
          {SORT_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.imageUrl}
                alt={product.name}
                sx={{ objectFit: 'contain' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    ₹ {product.price}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {product.description}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button
                    variant="contained"
                    onClick={() => handleBuy(product.id)}
                    sx={{
                      backgroundColor: '#3f51b5',
                      '&:hover': { backgroundColor: '#303f9f' },
                    }}
                  >
                    BUY
                  </Button>
                  {user?.role === 'admin' && (
                    <Box>
                      <IconButton onClick={() => handleEdit(product.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(product)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, product: null })}
      >
        <DialogTitle>Confirm deletion of product!</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the product?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, product: null })}>
            CANCEL
          </Button>
          <Button onClick={confirmDelete} color="error">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success/Error Messages */}
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
    </Box>
  );
};

export default Products;
