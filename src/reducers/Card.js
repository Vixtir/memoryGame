export const initialState = {
  id: undefined,
  cardType: undefined,
  flipped: false,
  guessed: false,
};

const cardState = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return {
        id: action.id,
        cardType: action.cardType,
        flipped: false,
        guessed: false,
      };
    case 'FLIP_CARD': {
      return { ...state, flipped: !state.flipped };
    }
    case 'GUESS_CARD': {
      return { ...state, guessed: !state.guessed };
    }
    default:
      return state;
  }
};

export default cardState;
