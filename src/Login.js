import { React, useState, useContext, useEffect }from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Context } from './';
import AuthService from './services/AuthService';

export default function SignIn() {


  const { store } = useContext(Context);
  useEffect (() => {
    if (localStorage.getItem('token')) {
        //console.log(localStorage.getItem('token'))
        store.checkAuth();
    }
  }, [])


  const Login = async (login, password) => {
      const res = await store.login(login, password);
      console.log(store.isAuth)
  }

  const registration = async () => {
    //role_id, secondName, firstName, patronomicName, district, login, password
      await AuthService.registrarion("ГВС по неврологии", "Чуприна", "Светлана", "Евгеньевна", "Воронежская область" ,'test', 'test')
  } 

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const theme = createTheme();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    /* setLogin(data.get('login'))
    setPassword(data.get('password')) */
    Login(data.get('login'), data.get('password'))
    console.log({
      email: data.get('login'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Войти
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="login"
              name="login"
              autoComplete="login"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Войти
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2" onClick={registration}>
                  {"Регистраиця"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}