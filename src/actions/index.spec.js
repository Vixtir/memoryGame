import * as actions from './index';
import * as actionTypes from '../constants/actionTypes';
import cardState from '../reducers/card';

const firstCard = cardState(undefined, actions.addCard(0, '9C'));
const secondCard = cardState(undefined, actions.addCard(1, '10C'));

describe('create action', () => {
  it('addCard', () => {
    const id = 0;
    const cardType = 9;
    const expectedAction = {
      type: actionTypes.ADD_CARD,
      id,
      cardType,
    };

    expect(actions.addCard(id, cardType)).toEqual(expectedAction);
  })

  it('flipAllCards', () => {
    const expectedAction = {
      type: actionTypes.FLIP_ALL_CARDS,
    };

    expect(actions.flipAllCards()).toEqual(expectedAction);
  });

  it('flipCard', () => {
    const expectedAction = {
      type: actionTypes.FLIP_CARD,
      card: firstCard,
    };

    expect(actions.flipCard(firstCard)).toEqual(expectedAction);
  });

  it('compareCards', () => {
    const pair = [firstCard, secondCard];
    const expectedAction = {
      type: actionTypes.COMPARE_CARDS,
      pair,
    };
    expect(actions.compareCards(pair)).toEqual(expectedAction);
  });

  it('startGame', () => {
    const expectedAction = {
      type: actionTypes.START_GAME,
    }

    expect(actions.startGame()).toEqual(expectedAction);
  });
});