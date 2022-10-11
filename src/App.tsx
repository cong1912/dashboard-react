import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { AppProvider } from './AppProvider';
import ErrorSnackbar from './content/pages/Components/ErrorSnackbar';

function App() {
  const content = useRoutes(router);

  return (
    <ThemeProvider>
      <AppProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          {content}
        </LocalizationProvider>
        <ErrorSnackbar />
      </AppProvider>
    </ThemeProvider>
  );
}
export default App;
