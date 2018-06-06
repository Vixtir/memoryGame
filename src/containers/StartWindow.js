import React from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';
import { startGame } from '../actions';

const StartWindow = ({
  startGame
}) => (
  <div className='start-window'>
    <img src='/images/StartGame.png' className='start-window_image'/>
    <p className='start-window_title'>
      MEMORY GAME
    </p>
    <Button
      dataTid="NewGame-startGame"
      className='button start-window_button'
      text="Начать игру"
      onButtonClick={startGame}/>
  </div>
);

export default connect(null, { startGame })(StartWindow);
