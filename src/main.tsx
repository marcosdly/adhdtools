import React from 'react';
import ReactDOM from 'react-dom/client';
import './lib/common/style.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={createBrowserRouter(routes)} />
  </React.StrictMode>,
);
