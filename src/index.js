import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Game from './containers/Game';
import cardBoardState from './reducers/CardBoard';
import css from './styles/index.styl';

const appState = combineReducers({
  gameDeck: cardBoardState,
});

render(
  <Provider store={createStore(appState)}>
    <Game />
  </Provider>,
  document.getElementById('root'),
);
