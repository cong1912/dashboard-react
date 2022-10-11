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
  const authRouter = useRoutes(AuthRoutes);
  console.log(authRouter);
  const unAuthRouter = useRoutes(UnAuthRoutes);

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
