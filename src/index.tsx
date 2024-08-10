import './assets/css/App.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import "antd/dist/antd.css";
import "./output.css"

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
