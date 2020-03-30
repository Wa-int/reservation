import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import './index.scss';
import * as serviceWorker from './serviceWorker';

const AppWithRouter = () => (
  <BrowserRouter basename="/home">
    <App />
  </BrowserRouter>
)

ReactDOM.render(<AppWithRouter />, document.getElementById('root'))
serviceWorker.register();