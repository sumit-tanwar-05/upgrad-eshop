import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, TextField } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    if (event.key === 'Enter' && searchQuery.trim() !== '') {
      navigate(`/search?query=${searchQuery.trim()}`);
    }
  };

  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <ShoppingCartIcon /> UpGrad Eshop
        </Typography>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/products">
              Home
            </Button>
            {user.role === 'admin' && (
              <Button color="inherit" component={Link} to="/add-product">
                Add Product
              </Button>
            )}
            <TextField
              placeholder="Search products"
              size="small"
              sx={{ backgroundColor: 'white', borderRadius: 1, marginRight: 2 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
