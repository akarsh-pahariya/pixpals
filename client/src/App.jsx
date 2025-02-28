import { Provider } from 'react-redux';
import appStore from './store/appStore';
import { RouterProvider } from 'react-router-dom';
import appRouter from './router/appRouter';

const App = () => {
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
};

export default App;
