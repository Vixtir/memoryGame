import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameScore from '../components/GameScore';
import CardBoard from '../components/CardBoard';
import Button from '../components/Button';
import { getCards } from '../reducers/cardBoard.js';
import {
  flipAllCards,
  flipCard,
  compareCards,
  startGame,
} from '../actions';

const FLIP_DELAY = 5000;

class GameWindow extends Component {
  componentDidMount() {
    this.timerID = setTimeout(this.props.flipAllCards, FLIP_DELAY);
  }

  componentWillUnmount() {
    clearTimeout(this.timerID);
  }

  componentDidUpdate() {
    const {
      needCompare,
      pair,
      compareCards
    } = this.props;
    setTimeout(() => {
      needCompare && compareCards(pair);
    }, 600);
  }

  handleResetButtonClick() {
    if (this.timerID) {
      clearTimeout(this.timerID);
    }

    this.props.startGame();
    this.timerID = setTimeout(this.props.flipAllCards, FLIP_DELAY);
  }

  render() {
    const {
      score,
      cards,
      flipCard,
      needCompare
    } = this.props;
    return (
      <div className='game-window'>
        <Button
          dataTid="NewGame-startGame"
          className="game-window_reset-btn"
          text="Начать заного"
          onButtonClick={() => this.handleResetButtonClick()}/>
        <GameScore
          score = {score}/>
        <CardBoard
          cards={cards}
          onCardClick = {flipCard}
          needCompare = {needCompare}
        />
      </div>
    );
  }
}

const mapStateToProps = state =>
  ({
    cards: getCards(state.cardBoard),
    pair: state.cardBoard.comparePair.pair,
    needCompare: state.cardBoard.comparePair.needCompare,
    score: state.gameInfo.score,
  });

const actions = {
  flipAllCards,
  flipCard,
  compareCards,
  startGame,
};

export default connect(mapStateToProps, actions)(GameWindow);
