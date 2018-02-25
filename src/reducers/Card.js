const cardState = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return {
        idx: action.idx,
        cardType: action.cardType,
        flip: false,
      };
    case 'FLIP_CARD': {
      if (state.idx === action.idx) {
        return Object.assign({}, state, { flip: !state.flip });
      } else {
        return state;
      }
      break;
    }
    default:
      return state;
  }
};

export default cardState;
