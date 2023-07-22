import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import {Link as RouterLink} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import supabase from '../utils/supabase';
import { resetError, resetSuccess } from '../components/utils/notification';

export default function Login({ handleLogin, handleEmailChange, handlePasswordChange }) {
const[email,setEmail]=React.useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email =data.get('email');
    const password = data.get('password');
  };
 const resetPassword=async ()=>{
  try {
    const reset= await supabase.auth.resetPasswordForEmail(email)
    if (reset.error)
        resetError(reset.error)
    else
        resetSuccess()
  } catch (error) {
    
  }
 }
  return (
    <div>
      <Container component="main" maxWidth="xs">
        
        <Box
          sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'lightgray',
              padding: '20px',
              borderRadius: '10px',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e)=>{
                handleEmailChange(e)
                setEmail(e.target.value)
              }}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
            />
            <Button
              onClick={handleLogin}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <a className='text-sm text-blue-600 underline cursor-pointer '  /*</Grid>onClick={resetPassword} */ >
                  {/* Forgot password? */}
                </a>
              </Grid>
              <Grid item>
              <RouterLink className='text-sm text-blue-600 underline' to="/signup" >
            Don't have an account? Sign Up
          </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <br />
      <br />
    </div>
  );
}
