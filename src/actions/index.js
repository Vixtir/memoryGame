import {
  FLIP_ALL_CARDS,
  FLIP_CARD,
  COMPARE_CARDS,
  START_GAME,
  ADD_CARD,
  GUESS_CARD,
} from '../constants/actionTypes';

export const addCard = (id, cardType) => ({
  type: ADD_CARD,
  id,
  cardType,
});

export const flipAllCards = () => ({
  type: FLIP_ALL_CARDS,
});

export const flipCard = card => ({
  type: FLIP_CARD,
  card,
});

export const guessCard = id => ({
  type: GUESS_CARD,
  id,
});

export const compareCards = pair => ({
  type: COMPARE_CARDS,
  pair,
});

export const startGame = () => ({
  type: START_GAME,
});
