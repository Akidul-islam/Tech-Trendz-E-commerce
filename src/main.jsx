import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import Store from './Redux/Store.js';
import { RouterProvider } from 'react-router-dom';
import { routes } from './Routes.jsx';
import { ThemeProvider } from '@material-tailwind/react';
import { theme } from './theme.config.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
      <ThemeProvider value={theme}>
        <RouterProvider router={routes} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
