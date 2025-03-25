import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './login.css';

const Login = () => (
  <Box p={3} maxWidth={400} mx="auto" className="login-box">
    <Typography variant="h4" align="center" gutterBottom>
      <ShoppingCartIcon /> Sign in
    </Typography>
    <TextField fullWidth label="Email Address" margin="normal" required />
    <TextField fullWidth label="Password" type="password" margin="normal" required />
    <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
      SIGN IN
    </Button>
    <Typography align="center" sx={{ mt: 2 }}>
      Don't have an account? <Link to="/signup">Sign Up</Link>
    </Typography>
  </Box>
);

export default Login;
