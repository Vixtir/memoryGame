import cardState from '../reducers/Card';

import { getNineRandomNumbers, shuffleArray } from '../utils/utils';

const CARD_SUITS = ['D', 'H', 'S', 'C'];
const CARD_VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 0, 'J', 'Q', 'K', 'A'];

const createCardDeck = (cardSuits, cardValues) => {
  const result = cardSuits.reduce((deck, suit) => {
    return [
      ...deck,
      ...cardValues.map(cardValue => `${cardValue}${suit}`)];
  }, []);

  return result;
};

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

  return {
    cards: gameDeck,
    activeCard: '',
    compareCards: [],
    needCompare: false,
  };
};

const cardsBoardState = (state = initialState(), action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return Object.assign({}, state, {
        cards: [
          ...state,
          cardState(undefined, action),
        ],
      });
    case 'FLIP_ALL_CARDS': {
      return Object.assign({}, state, {
        cards: state.cards.map((card, idx) => cardState(card, { type: 'FLIP_CARD', idxs: [idx] })),
      });
    }
    case 'FLIP_CARD': {
      return Object.assign({}, state, {
        cards: state.cards.map((card) => cardState(card, { type: 'FLIP_CARD', idxs: action.idxs })),
      });
    }
    case 'COMPARE_CARDS': {
      const [firstCard, secondCard] = state.compareCards;
      if (firstCard.cardType === secondCard.cardType) {
        // подсчет очков, проверка окончания игры
        return Object.assign({}, state, { needCompare: false, compareCards: [] });
      } else {
        return Object.assign(
          {}, 
          state, 
          { 
            cards: state.cards.map(card =>
              cardState(card, { type: 'FLIP_CARD', idxs: [firstCard.idx, secondCard.idx]})),
            compareCards: [],
            needCompare: false
          }
        )
      }
    }
    case 'CHOOSE_CARD': {
      const flippedCards = state.cards.map(card => cardState(card, { type: 'FLIP_CARD', idxs: [action.card.idx] }));
      const compareCards = state.compareCards.splice('');

      return Object.assign(
        {},
        state,
        {
          cards: flippedCards,
          compareCards: [...compareCards, action.card],
          needCompare: compareCards.length === 1,
        },
      );
    }
    default:
      return state;
  }
};

export default cardsBoardState;
