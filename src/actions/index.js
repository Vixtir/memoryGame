export const flipAllCards = () => ({
  type: 'FLIP_ALL_CARDS',
});

export const chooseCard = card => ({
  type: 'FLIP_CARD',
  card,
});

export const compareCards = pair => ({
  type: 'COMPARE_CARDS',
  pair,
});

export const startGame = () => ({
  type: 'START_GAME',
});
