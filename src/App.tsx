import { useRoutes } from 'react-router-dom';
import routes from 'src/routes';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { AppProvider } from './AppProvider';
import ErrorSnackbar from './content/pages/Components/ErrorSnackbar';
import SuccessSnackbar from './content/pages/Components/SuccessSnackbar';

function App() {
  const existedUserSession = JSON.parse(
    localStorage.getItem('token') || 'null'
  );
  const content = useRoutes(routes(Boolean(existedUserSession)));

  return (
    <ThemeProvider>
      <AppProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          {content}
        </LocalizationProvider>
        <ErrorSnackbar />
        <SuccessSnackbar />
      </AppProvider>
    </ThemeProvider>
  );
}
export default App;
