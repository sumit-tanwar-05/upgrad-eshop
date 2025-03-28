import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, Box, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import SearchIcon from '@mui/icons-material/Search';
import './navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    if (event.key === 'Enter' && searchQuery.trim() !== '') {
      try {
        const response = await fetch(`/products/search?query=${searchQuery.trim()}`);
        if (!response.ok) throw new Error('Search failed');
        const data = await response.json();
        navigate('/products', { state: { searchResults: data } });
      } catch (error) {
        console.error('Search error:', error);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" className="navbar" sx={{ backgroundColor: '#3f51b5' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
        {/* Left section - Logo */}
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ 
            textDecoration: 'none', 
            color: 'white', 
            display: 'flex', 
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <ShoppingCartIcon /> upGrad E-Shop
        </Typography>

        {/* Center section - Search */}
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <Box sx={{ 
            position: 'absolute', 
            left: '50%', 
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 1,
            width: '300px',
          }}>
            <TextField
              size="small"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
              sx={{ 
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { border: 'none' },
                },
              }}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Box>
        </div>

        {/* Right section - Navigation */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
            sx={{ color: 'white', textTransform: 'none' }}
          >
            Home
          </Button>

          {/* Show Add Product only for non-logged in users or admin */}
          {(!user || (user && user.role === 'admin')) && (
            <Button 
              color="inherit" 
              component={Link} 
              to="/add-product"
              sx={{ color: 'white', textTransform: 'none' }}
            >
              Add Product
            </Button>
          )}

          {user ? (
            <Button 
              variant="contained" 
              onClick={handleLogout}
              sx={{ 
                backgroundColor: '#ff0000',
                '&:hover': {
                  backgroundColor: '#cc0000'
                }
              }}
            >
              LOGOUT
            </Button>
          ) : (
            <>
              <Button 
                variant="contained" 
                component={Link} 
                to="/login"
                sx={{ 
                  backgroundColor: '#ff0000',
                  '&:hover': {
                    backgroundColor: '#cc0000'
                  }
                }}
              >
                LOGIN
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/signup"
                sx={{ color: 'white', textTransform: 'none' }}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
