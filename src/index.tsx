import React from 'react';
import './assets/css/App.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import "antd/dist/antd.css";
import "./output.css";

import App from './App';
import { Suspense } from 'react';
import { Styles } from './styles/styles';
import { Provider } from 'react-redux';
import store from './redux/store'; // Adjust the import path according to where your store.ts file is located

import routes from './routes';


const root = ReactDOM.createRoot(document.getElementById('root')!);
const router = createBrowserRouter(routes);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={null}>
        <Styles />
        <App /> {/* No RouterProvider here */}
      </Suspense>
    </BrowserRouter>
  </Provider>
);
