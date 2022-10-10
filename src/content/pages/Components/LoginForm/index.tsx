import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  TextField
} from '@mui/material';

const LoginForm = ({
  requesting,
  errorEmailField,
  errorPasswordField,
  loginAccount,
  handleChangeEmail,
  handleChangePassword,
  handleSubmitForm
}) => {
  return (
    <Box component="form" noValidate onSubmit={handleSubmitForm} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={handleChangeEmail}
        value={loginAccount.email}
        error={Boolean(errorEmailField)}
        helperText={errorEmailField?.error}
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
        onChange={handleChangePassword}
        value={loginAccount.password}
        error={Boolean(errorPasswordField)}
        helperText={errorPasswordField?.error}
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={requesting}
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
