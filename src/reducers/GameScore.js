const gameScoreState = (state = 0, action) => {
  let newScore;
  switch (action.type) {
    case 'INC_SCORE':
      newScore = state + action.score;
      return newScore;
    case 'DEC_SCORE':
      newScore = state - action.score;
      return newScore;
    case 'RESET_SCORE':
      return 0;
    default:
      return state;
  }
};

export default gameScoreState;

export const INC_SCORE = score => ({
  type: 'INC_SCORE',
  score,
});

export const DEC_SCORE = score => ({
  type: 'DEC_SCORE',
  score,
});

export const RESET_SCORE = () => ({
  type: 'RESET_SCORE',
});
