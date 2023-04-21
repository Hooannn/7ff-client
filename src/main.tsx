import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import { ConfigProvider } from 'antd';
import './libs/i18n';
import 'react-toastify/dist/ReactToastify.css';
import getRouter from './@core/router/index';
import { store } from './@core/store';
import './index.css';

const isDev = import.meta.env.VITE_NODE_ENV === 'dev';
const persistor = persistStore(store);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider
    theme={{ token: { colorPrimary: '#FFBE33', colorPrimaryHover: '#E69C00' } }}
    children={
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={getRouter(isDev)} />
          </QueryClientProvider>
        </PersistGate>
        <ToastContainer />
      </Provider>
    }
  />,
);
