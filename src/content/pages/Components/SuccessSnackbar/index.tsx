import { Snackbar } from '@mui/material';
import { AppContext } from 'src/AppProvider';
import React, { useContext } from 'react';
import { AppContextType } from 'src/interfaces/AppContextType';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { SUCCESS_ACTION } from 'src/reduces/SuccessReducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SuccessSnackbar = () => {
  const appContext = useContext(AppContext) as AppContextType;
  const { successReducer } = appContext;
  const [success, dispatch] = successReducer;
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({
      type: SUCCESS_ACTION.REMOVE_SUCCESS
    });
  };
  return (
    <Snackbar
      data-testid="snackbar"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={Boolean(success)}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {success}
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackbar;
