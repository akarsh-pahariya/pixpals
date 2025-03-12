import { Provider } from 'react-redux';
import appStore from './store/appStore';
import { RouterProvider } from 'react-router-dom';
import appRouter from './router/appRouter';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
      <ToastContainer />
    </Provider>
  );
};

export default App;
