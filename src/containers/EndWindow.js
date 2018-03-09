import React from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';
import { changeStage } from '../actions';

const EndWindow = ({
  score,
  changeStage
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
      onButtonClick={() => changeStage('game')}/>
  </div>
);

const mapStateToProps = state => ({
  score: state.AppState.gameScore,
});

export default connect(mapStateToProps, { changeStage })(EndWindow);
