export const flipAllCards = () => ({
  type: 'FLIP_ALL_CARDS',
});

export const chooseCard = card => ({
  type: 'CHOOSE_CARD',
  card,
});

export const compareCards = () => ({
  type: 'COMPARE_CARDS',
});

export const changeStage = stage => ({
  type: 'CHANGE_STAGE',
  stage,
});
