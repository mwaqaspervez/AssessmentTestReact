import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './app/Index';
import store from './redux/rootReducer';
import './styles/base.less'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);