import './assets/css/App.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import "antd/dist/antd.css";
import "./output.css"

import App from './App';
import { Suspense } from 'react';
import { Styles } from 'styles/styles';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Suspense fallback={null}>
    <Styles />
    <App />
    </Suspense>
  </BrowserRouter>,
);