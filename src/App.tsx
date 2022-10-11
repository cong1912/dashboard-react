import { useRoutes } from 'react-router-dom';
import AuthRoutes from 'src/routers/authRouter';
import UnAuthRoutes from 'src/routers/unAuthRouter';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { AppProvider } from './AppProvider';
import ErrorSnackbar from './content/pages/Components/ErrorSnackbar';

function App() {
  const existedUserSession = JSON.parse(
    localStorage.getItem('token') || 'null'
  );
  const authRouter = useRoutes(AuthRoutes(Boolean(existedUserSession)));
  const unAuthRouter = useRoutes(UnAuthRoutes);
  console.log('use', Boolean(existedUserSession));

  return (
    <ThemeProvider>
      <AppProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          {unAuthRouter}

          {authRouter}
        </LocalizationProvider>
        <ErrorSnackbar />
      </AppProvider>
    </ThemeProvider>
  );
}
export default App;
