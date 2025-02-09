import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import NotFound from '../components/NotFound/NotFound';
import CharacterDetail from '../components/CharactersDetail/CharacterDetail';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'details/:id',
        element: <CharacterDetail />,
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
