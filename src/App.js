import { Provider } from 'react-redux';
import { store } from './store/configStore';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
