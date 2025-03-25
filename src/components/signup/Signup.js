import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './signup.css';

const Signup = () => (
  <Box p={3} maxWidth={400} mx="auto" className="signup-box">
    <Typography variant="h4" align="center" gutterBottom>
      <ShoppingCartIcon /> Sign up
    </Typography>
    <TextField fullWidth label="First Name" margin="normal" required />
    <TextField fullWidth label="Last Name" margin="normal" required />
    <TextField fullWidth label="Email Address" margin="normal" required />
    <TextField fullWidth label="Password" type="password" margin="normal" required />
    <TextField fullWidth label="Confirm Password" type="password" margin="normal" required />
    <TextField fullWidth label="Contact Number" margin="normal" required />
    <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
      SIGN UP
    </Button>
    <Typography align="center" sx={{ mt: 2 }}>
      Already have an account? <Link to="/login">Sign in</Link>
    </Typography>
  </Box>
);

export default Signup;
