const cardState = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return {
        idx: action.idx,
        cardType: action.cardType,
        flip: false,
      };
    case 'FLIP_CARD': {
      if (action.idxs.indexOf(state.idx) !== -1) {
        return Object.assign({}, state, { flip: !state.flip });
      } else {
        return state;
      }
    }
    default:
      return state;
  }
};

export default cardState;
