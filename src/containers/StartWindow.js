import React from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';
import { changeStage } from '../actions';

const StartWindow = ({
  changeStage
}) => (
  <div className='start-window'>
    <img src='/images/StartGame.png'/>
    <p className='start-window_title'>
      MEMORY GAME
    </p>
    <Button
      className='button start-window_button'
      text="Начать игру"
      onButtonClick={() => changeStage('game')}/>
  </div>
);

export default connect(null, { changeStage })(StartWindow);
