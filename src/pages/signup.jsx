import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { Link as RouterLink } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import supabase from '../utils/supabase'
import { signUpError, signUpSuccess } from '../components/utils/notification'

export default function SignUp () {
  const handleSubmit = event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const mail = data.get('email')
    const password = data.get('password')
    handleSignUp(mail, password)
  }

  const handleSignUp = async (email, password) => {
    try {
      const signup = await supabase.auth.signUp({
        email: email,
        password: password
      })
      if (signup.error) {
        signUpError(signup.error.message)
      } else {
        signUpSuccess()
       
      }
    } catch (error) {
      signUpError(error)
    }
  }
  //Kullanıcı oluşturulduğunda==>Week Tabloları veritabnanına eklenecek!!!
  return (
    <div>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'lightgray',
            padding: '20px',
            borderRadius: '10px'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <RouterLink
                  className='text-sm text-blue-600 underline'
                  to='/'
                  variant='body2'
                >
                  Already have an account? Sign in
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <br />
        <br />
      </Container>
    </div>
  )
}
