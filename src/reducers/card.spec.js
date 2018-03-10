import reducer, { initialState } from './card';
import {
  addCard,
  chooseCard,
  guessed,
  flipCard,
  guessCard
} from '../actions';

describe('card reducer', () => {
  let state = {};

  it('return initial state', () => {
    const expectedState = {
      id: undefined,
      cardType: undefined,
      flipped: false,
      guessed: false,
    };

    expect(reducer(undefined, {})).toEqual(expectedState);
  });

  describe('action', () => {
    it('add_card', () => {
      const cardType = '2D';
      const id = 2;
      const expectedState = {
        id,
        cardType,
        flipped: false,
        guessed: false,
      };

      expect(reducer(initialState, addCard(id, cardType))).toEqual(expectedState);
    })

    describe('when card is added', () => {
      let state;

      beforeEach(() => {
        state = reducer(initialState, addCard(0, '2D'));
      });

      it('flip card', () => {
        const expectedState = {
          ...state,
          flipped: true,
        };

        expect(reducer(state, flipCard())).toEqual(expectedState);
      });

      it('guess card', () => {
        const expectedState = {
          ...state,
          guessed: true,
        };

        expect(reducer(state, guessCard())).toEqual(expectedState);
      });
    });
  });
});

