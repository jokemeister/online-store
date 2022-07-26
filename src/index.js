import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //     </React.StrictMode>
  <Provider store={ store }>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>

);
