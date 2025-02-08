import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import NotFound from '../components/NotFound/NotFound';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/main" />,
  },
  {
    path: '/main',
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
