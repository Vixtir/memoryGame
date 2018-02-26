import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import cardBoardState from './reducers/CardBoard';
import gameStageState from './reducers/GameStage';
import css from './styles/index.styl';

const appState = combineReducers({
  gameDeck: cardBoardState,
  gameStage: gameStageState,
});

render(
  <Provider store={createStore(appState)}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
