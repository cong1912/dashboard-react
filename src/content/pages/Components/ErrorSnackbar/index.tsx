import { Snackbar } from '@mui/material';
import { AppContext } from 'src/AppProvider';
import React, { useContext } from 'react';
import { AppContextType } from 'src/interfaces/AppContextType';
import { ERROR_ACTION } from 'src/reduces/ErrorsReducer';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ErrorSnackbar = () => {
  const appContext = useContext(AppContext) as AppContextType;
  const { errorsReducer } = appContext;
  const [error, dispatch] = errorsReducer;
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({
      type: ERROR_ACTION.REMOVE_ERROR
    });
  };
  return (
    <Snackbar
      data-testid="snackbar"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={Boolean(error)}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
