import * as fromHelpers from '../helpers';

const decScore = state =>
  state.score - ((9 - state.unOpenPairs) * 42);

const incScore = state =>
  state.score + (state.unOpenPairs * 42);

const getGameStage = (state) => {
  return state.unOpenPairs - 1 ? 'game' : 'end';
};

const initialState = {
  stage: 'start',
  score: 0,
  unOpenPairs: 9,
};

const gameInfo = (state = initialState, action) => {
  switch (action.type) {
    case 'START_GAME': {
      return {
        ...initialState,
        stage: 'game',
      };
    }
    case 'COMPARE_CARDS': {
      const isPair = fromHelpers.checkPair(action.pair);
      if (isPair) {
        return {
          ...state,
          score: incScore(state),
          stage: getGameStage(state),
          unOpenPairs: state.unOpenPairs - 1,
        };
      } else {
        return {
          ...state,
          score: decScore(state),
        };
      }
    }  
    default:
      return state;
  }
};

export default gameInfo;
