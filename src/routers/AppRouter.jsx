import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import MainPage from '../pages/MainPage';
import Detail from '../pages/Detail';
import Practice from '../pages/Practice';
import NotFound from '../pages/NotFound';
import Signup from '../pages/home/Signup';
import Login from '../pages/home/Login'; // Login import 추가

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />, // Home 컴포넌트를 부모로 설정
    children: [
      {
        path: '/', // '/' 경로에서 Login 컴포넌트 렌더링
        element: <Login />,
      },
      {
        path: 'signup', // '/signup' 경로에서 Signup 컴포넌트 렌더링
        element: <Signup />,
      },
    ],
  },
  {
    path: '/main/',
    element: <MainPage />,
    index: true,
  },
  {
    path: '/detail/:boardId', // boardId가 URL을 통해 전달되게 수정
    element: <Detail />,
  },
  {
    path: '/practices/:id',
    element: <Practice />,
    index: true,
  },
  {
    path: '*',
    element: <NotFound />,
    index: true,
  },
]);

export default AppRouter;
