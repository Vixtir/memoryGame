import { combineReducers } from 'redux';
import cardBoard from './cardBoard';
import gameInfo from './gameInfo';

const rootState = combineReducers({
  cardBoard,
  gameInfo,
});

export default rootState;
