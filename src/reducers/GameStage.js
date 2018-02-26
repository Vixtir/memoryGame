const gameStageState = (state = 'start', action) => {
  switch (action.type) {
    case 'CHANGE_STAGE':
      return action.stage;
    default:
      return state;
  }
};

export default gameStageState;
