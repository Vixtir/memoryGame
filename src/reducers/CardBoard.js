import cardState from '../reducers/Card';
import { getNineRandomNumbers, shuffleArray } from '../utils/utils';

const CARD_SUITS = ['D', 'H', 'S', 'C'];
const CARD_VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 0, 'J', 'Q', 'K', 'A'];

const createCardDeck = (cardSuits, cardValues) =>
  cardSuits.reduce(
    (deck, suit) =>
      [
        ...deck,
        ...cardValues.map(cardValue => `${cardValue}${suit}`)]
    , [],
  );

const createGameDeck = (cardDeck) => {
  const nineUniqueIndexes = getNineRandomNumbers(cardDeck.length);
  const cards = nineUniqueIndexes.map(idx => cardDeck[idx]);

  return shuffleArray([...cards, ...cards]);
};

const initialState = () => {
  const deck = createCardDeck(CARD_SUITS, CARD_VALUES); // 52 cards
  const gameDeck = createGameDeck(deck).map((card, idx) =>
    cardState(undefined, {
      type: 'ADD_CARD',
      idx,
      cardType: card,
    }));

  return gameDeck;
};

const cardsBoardState = (state = initialState(), action) => {
  switch (action.type) {
    case 'FLIP_ALL_CARDS': {
      return state.map((card, idx) => cardState(card, { type: 'FLIP_CARD', idxs: [idx] }));
    }
    case 'FLIP_CARD': {
      return state.map(card => cardState(card, action));
    }
    case 'GUESS_CARD': {
      return state.map(card => cardState(card, action));
    }
    default:
      return state;
  }
};

export default cardsBoardState;
