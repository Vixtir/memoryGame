import React from 'react';
import { connect } from 'react-redux';
import Button from './Button';

const StartWindow = ({
  onButtonClick
}) => {
  return (
    <div className='start-window'>
      <img src='/images/StartGame.png'/>
      <p>
        MEMORY GAME
      </p>
      <Button text="Начать игру" onButtonClick={onButtonClick}/>
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  ({
    onButtonClick: () => dispatch({ type: 'CHANGE_STAGE', stage: 'game' }),
  });

export default connect(null, mapDispatchToProps)(StartWindow);
