import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import MainPage from '../pages/MainPage';

const AppRouter = createBrowserRouter([
  {
    path: '/home',
    element: <Home />,
    index: true,
  },
  {
    path: '/main/',
    element: <MainPage />,
    index: true,
  },
  {
    path: '*',
    element: <NotFound />,
    index: true,
  },
]);

export default AppRouter;
