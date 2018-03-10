const cardState = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return {
        idx: action.idx,
        cardType: action.cardType,
        flipped: false,
        guessed: false,
      };
    case 'FLIP_CARD': {
      if (action.idxs.includes(state.idx)) {
        return { ...state, flipped: !state.flipped };
      } else {
        return state;
      }
    }
    case 'GUESS_CARD': {
      if (action.idxs.includes(state.idx)) {
        return { ...state, guessed: true };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
};

export default cardState;
