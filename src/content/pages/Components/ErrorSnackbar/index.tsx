import { Snackbar } from '@mui/material';
import { AppContext } from 'src/AppProvider';
import React, { useContext } from 'react';
import { AppContextType } from 'src/interfaces/AppContextType';

const ErrorSnackbar = () => {
  const appContext = useContext(AppContext) as AppContextType;
  const { errorsReducer } = appContext;
  const [error, dispatch] = errorsReducer;
  return (
    <Snackbar
      data-testid="snackbar"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={Boolean(error)}
      message={error}
    />
  );
};

export default ErrorSnackbar;
