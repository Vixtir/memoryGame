import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import rootState from './reducers';
import css from './styles/index.styl';

render(
  <Provider store={createStore(rootState)}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
