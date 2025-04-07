import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import GroupDetails from '../pages/GroupDetails';
import Home from '../pages/Home';
import User from '../pages/User';
import GroupUploads from '../pages/GroupUploads';
import ImageUpload from '../pages/ImageUpload';
import ForgotPassword from '../pages/forgotPassword';
import ResetPassword from '../pages/resetPassword';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'group/:groupId',
        element: <GroupUploads />,
      },
      {
        path: 'group/:groupId/details',
        element: <GroupDetails />,
      },
      {
        path: 'group/:groupId/upload',
        element: <ImageUpload />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'reset-password/:token',
        element: <ResetPassword />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: '/user',
        element: <User />,
      },
    ],
  },
]);

export default appRouter;
