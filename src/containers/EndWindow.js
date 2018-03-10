import React from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';
import { startGame } from '../actions';

const EndWindow = ({
  score,
  startGame
}) => (
  <div className='end-window'>
    <img src='/images/EndGame.png'/>
    <span className='end-window_title'>
      <p>Поздравляем</p>
      <p>Ваш итоговый счет: { score }</p>
    </span>
    <Button
      className='button end-window_button'
      text='Еще раз'
      onButtonClick={() => startGame('game')}/>
  </div>
);

const mapStateToProps = state => ({
  score: state.gameInfo.score,
});

export default connect(mapStateToProps, { startGame })(EndWindow);
