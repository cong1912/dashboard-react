import React, { useState, useContext } from 'react';
import LoginForm from '../pages/Components/LoginForm';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, CssBaseline, Grid, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { login } from 'src/services/AuthService';
import { NavigateFunction, useNavigate } from 'react-router';
import { ERROR_ACTION } from 'src/reduces/ErrorsReducer';
import { AppContext } from 'src/AppProvider';
import { AppContextType } from 'src/interfaces/AppContextType';
import { UserSession } from 'src/interfaces/User';
import * as yup from 'yup';
const theme = createTheme();
import { useFormik } from 'formik';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
});

const index = () => {
  let navigate: NavigateFunction = useNavigate();
  const [requesting, setRequesting] = useState<boolean>(false);
  const appContext = useContext(AppContext) as AppContextType;
  const { errorsReducer } = appContext;
  const [errors, errorDispatch] = errorsReducer;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setRequesting(true);

      try {
        const response: { data: UserSession } = await login(values);
        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('userSession', JSON.stringify(response.data.user));
        navigate('/');
        resetForm();
        setRequesting(false);
      } catch (error) {
        errorDispatch({
          type: ERROR_ACTION.SET_ERROR,
          error: error.response.data.message
        });

        setRequesting(false);
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <LoginForm requesting={requesting} formik={formik} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default index;
