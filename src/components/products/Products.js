import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Select,
  MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './products.css';

const Products = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products
    fetch('/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error fetching products:', err));

    // Fetch categories
    fetch('/products/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  const filteredProducts = products.filter((product) =>
    selectedCategory === 'all' ? true : product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'priceHighToLow') return b.price - a.price;
    if (sortOption === 'priceLowToHigh') return a.price - b.price;
    if (sortOption === 'newest') return new Date(b.dateAdded) - new Date(a.dateAdded);
    return 0;
  });

  const handleBuy = (id) => navigate(`/products/${id}`);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      <ToggleButtonGroup
        value={selectedCategory}
        exclusive
        onChange={(e, category) => setSelectedCategory(category || 'all')}
        sx={{ my: 2 }}
      >
        <ToggleButton value="all">All</ToggleButton>
        {categories.map((category) => (
          <ToggleButton key={category} value={category}>
            {category}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        displayEmpty
        sx={{ mb: 2 }}
      >
        <MenuItem value="default">Default</MenuItem>
        <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
        <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
        <MenuItem value="newest">Newest</MenuItem>
      </Select>

      <Box display="flex" flexWrap="wrap" gap={2}>
        {sortedProducts.map((product) => (
          <Card key={product.id} className="product-card">
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography>Price: ₹{product.price}</Typography>
              <Typography>Category: {product.category}</Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" onClick={() => handleBuy(product.id)}>
                Buy
              </Button>
              {user?.role === 'admin' && (
                <>
                  <Button startIcon={<EditIcon />} color="secondary">
                    Edit
                  </Button>
                  <Button startIcon={<DeleteIcon />} color="error">
                    Delete
                  </Button>
                </>
              )}
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Products;
