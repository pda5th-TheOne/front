import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Main from '../pages/Main';

const AppRouter = createBrowserRouter([
    {
        path: '/home',
        element: <Home />,
        index: true,
      },
    {
      path: '*',
      element: <NotFound />,
      index: true,
    },
    {
      path: '/main/',
      element: <Main />,
      index: true,
    }
  ]);
  
  export default AppRouter;
