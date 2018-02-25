import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardBoard from '../components/CardBoard';

class Game extends Component {
  render() {
    return (
      <div className='game-board'>
        <CardBoard />
      </div>
    );
  }
}

export default Game;
