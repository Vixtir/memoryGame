import { combineReducers } from 'redux';
import cardState from './card';
import * as fromHelpers from '../helpers';
import { addCard, flipCard, guessCard } from '../actions';

const getGameCards = () =>
  fromHelpers.createGameDeck().reduce((obj, cardType, id) => {
    obj[id] = cardState(undefined, addCard(id, cardType));
    return obj;
  }, {});

const cardIds = (state = [], action) => {
  switch (action.type) {
    case 'START_GAME': {
      return [...Array(18).keys()];
    }
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'START_GAME': {
      return getGameCards();
    }
    case 'FLIP_ALL_CARDS': {
      const ids = Object.keys(state);
      return ids.reduce((obj, id) => {
        obj[id] = { ...state[id], flipped: true };
        return obj;
      }, {});
    }
    case 'FLIP_CARD': {
      const cardId = action.card.id;
      return {
        ...state,
        [cardId]: cardState(state[cardId], action),
      };
    }
    case 'COMPARE_CARDS': {
      const [firstCard, secondCard] = action.pair;
      const isPair = fromHelpers.checkPair(action.pair);
      const cardAction = isPair ? guessCard : flipCard;
      return {
        ...state,
        [firstCard.id]: cardState(state[firstCard.id], cardAction(firstCard.id)),
        [secondCard.id]: cardState(state[secondCard.id], cardAction(secondCard.id)),
      };
    }
    default:
      return state;
  }
};

const comparePairInitState = {
  pair: [],
  needCompare: false,
};

const comparePair = (state = comparePairInitState, action) => {
  switch (action.type) {
    case 'FLIP_CARD':
      return {
        pair: [...state.pair, action.card],
        needCompare: state.pair.length === 1,
      };
    case 'START_GAME':
    case 'COMPARE_CARDS':
      return comparePairInitState;
    default:
      return state;
  }
};

export const getCard = (state, id) =>
  state.byId[id];

export const getCards = state =>
  state.cardIds.map(id => getCard(state, id));

export const getPair = state =>
  state.comparePair.pair;

export default combineReducers({
  cardIds,
  byId,
  comparePair,
});
