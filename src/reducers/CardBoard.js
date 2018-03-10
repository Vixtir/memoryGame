import { combineReducers } from 'redux';
import cardState from '../reducers/card';
import * as fromHelpers from '../helpers';

const getGameCards = () => {
  const gameDeck = fromHelpers.createGameDeck().map((card, idx) =>
    cardState(undefined, {
      type: 'ADD_CARD',
      idx,
      cardType: card,
    }));
  return gameDeck;
};

const cardList = (state = [], action) => {
  switch (action.type) {
    case 'START_GAME': {
      return getGameCards();
    }
    case 'FLIP_ALL_CARDS': {
      return state.map((card, idx) => cardState(card, { type: 'FLIP_CARD', idxs: [idx] }));
    }
    case 'FLIP_CARD': {
      return state.map(card => cardState(card, { type: 'FLIP_CARD', idxs: [action.card.idx] }));
    }
    case 'COMPARE_CARDS': {
      const [firstCard, secondCard] = action.pair;
      const isPair = fromHelpers.checkPair(action.pair);

      return state.map(card =>
        cardState(card, {
          type: isPair ? 'GUESS_CARD' : 'FLIP_CARD',
          idxs: [firstCard.idx, secondCard.idx],
        }));
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

export default combineReducers({
  cardList,
  comparePair,
});
