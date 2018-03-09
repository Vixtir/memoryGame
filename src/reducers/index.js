import cardsBoardState, * as fromCardBoard from './CardBoard';
import cardState from './Card';
import gameScore, { INC_SCORE, DEC_SCORE } from './GameScore';

const initialState = {
  cards: [],
  compareCardsPair: [],
  needCompare: false,
  gameScore,
  unOpenPair: 9,
  gameStage: 'start',
};

const checkPair = (cardPair) => {
  const [firstCard, secondCard] = cardPair;
  return firstCard.cardType === secondCard.cardType;
};

const checkEndGame = countUnopenedCard =>
  countUnopenedCard === 0;

const appState = (state = initialState, action) => {
  switch (action.type) {
    case 'FLIP_ALL_CARDS': {
      return {
        ...state,
        cards: cardsBoardState(state.cards, action),
      };
    }
    case 'CHOOSE_CARD': {
      const compareCardsPair = state.compareCardsPair.slice('');

      return Object.assign(
        {},
        state,
        {
          cards: cardsBoardState(state.cards, { type: 'FLIP_CARD', idxs: [action.card.idx] }),
          compareCardsPair: [...compareCardsPair, action.card],
          needCompare: compareCardsPair.length === 1,
        },
      );
    }
    case 'COMPARE_CARDS': {
      const isPair = checkPair(state.compareCardsPair);
      const [firstCard, secondCard] = state.compareCardsPair;
      const newState = {
        needCompare: false,
        compareCardsPair: [],
      };

      if (isPair) {
        const unOpenPair = state.unOpenPair - 1;
        const isEnd = checkEndGame(unOpenPair);

        if (isEnd) {
          newState.cards = [];
          newState.gameStage = 'end';
        } else {
          newState.gameScore = gameScore(state.gameScore, INC_SCORE(unOpenPair * 42));
          newState.unOpenPair = unOpenPair;
          newState.cards = cardsBoardState(state.cards, { type: 'GUESS_CARD', idxs: [firstCard.idx, secondCard.idx] });
        }
      } else {
        const openPair = 9 - state.unOpenPair;
        newState.gameScore = gameScore(state.gameScore, DEC_SCORE(openPair * 42));
        newState.cards = cardsBoardState(state.cards, { type: 'FLIP_CARD', idxs: [firstCard.idx, secondCard.idx] });
      }
      return Object.assign({}, state, newState);
    }
    case 'CHANGE_STAGE':
      switch (action.stage) {
        case 'start':
          return initialState;
        case 'game':
          return Object.assign(
            {},
            {
              cards: cardsBoardState(undefined, { type: 'INIT' }),
              gameStage: 'game',
              compareCardsPair: [],
              needCompare: false,
              gameScore: 0,
              unOpenPair: 9,
            },
          );
        case 'end':
          return Object.assign({}, state);
        default:
          return state;
      }
    default:
      return state;
  }
};

export default appState;
