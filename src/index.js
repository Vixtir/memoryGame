import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import AppState from './reducers/index';
import css from './styles/index.styl';

const appState = combineReducers({ AppState });

render(
  <Provider store={createStore(appState)}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
