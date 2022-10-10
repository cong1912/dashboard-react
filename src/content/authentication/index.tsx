import React, { useState, ChangeEvent, useContext } from 'react';
import LoginForm from '../pages/Components/LoginForm';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, CssBaseline, Grid, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Validator from 'input-field-validator';
import { login } from 'src/services/AuthService';
import { ErrorField } from 'src/interfaces/ErrorField';
import { Navigate, NavigateFunction, useNavigate } from 'react-router';
import { ERROR_ACTION } from 'src/reduces/ErrrorsReducer';
import { AppContext } from 'src/AppProvider';
import { AppContextType } from 'src/interfaces/AppContextType';
import { UserSession } from 'src/interfaces/User';

const theme = createTheme();

const index = () => {
  const [requesting, setRequesting] = useState<boolean>(false);
  let navigate: NavigateFunction = useNavigate();
  const appContext = useContext(AppContext) as AppContextType;
  const { errorsReducer } = appContext;
  const [errors, errorDispatch] = errorsReducer;
  const [loginAccount, setLoginAccount] = useState({
    email: '',
    password: ''
  });
  const [errorField, setErrorField] = useState<ErrorField[]>([]);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginAccount({ ...loginAccount, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRequesting(true);

    try {
      const validation = new Validator(
        { email: loginAccount.email, password: loginAccount.password },
        {
          email: ['required', 'email', 'lowercase'],
          password: ['required', 'minlength:8']
        }
      );
      const valid = validation.validate();
      if (!valid) {
        setErrorField(validation.fieldErrors);
        errorDispatch({
          type: ERROR_ACTION.SET_ERROR,
          error: 'Error input'
        });
        setRequesting(false);
        return;
      }

      setErrorField([]);

      const response: { data: UserSession } = await login({
        email: loginAccount.email,
        password: loginAccount.password
      });

      localStorage.setItem('token', JSON.stringify(response.data.token));
      navigate('/dashboards/crypto');
      setLoginAccount({
        email: '',
        password: ''
      });
    } catch (error) {
      errorDispatch({
        type: ERROR_ACTION.SET_ERROR,
        error: (error as Error).message
      });
      setRequesting(false);
    }
  };

  const errorEmailField: ErrorField | undefined = errorField.find(
    (element: { field: string; error: string }) => element.field == 'email'
  );
  const errorPasswordField: ErrorField | undefined = errorField.find(
    (element: { field: string; error: string }) => element.field == 'password'
  );

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
            <LoginForm
              requesting={requesting}
              errorEmailField={errorEmailField}
              errorPasswordField={errorPasswordField}
              loginAccount={loginAccount}
              handleChangeEmail={handleChangeValue}
              handleChangePassword={handleChangeValue}
              handleSubmitForm={handleSubmitForm}
            />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default index;
