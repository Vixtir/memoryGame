import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameScore from '../components/GameScore';
import CardBoard from '../components/CardBoard';
import Button from '../components/Button';
import {
  flipAllCards,
  chooseCard,
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
    return (
      <div className='game-window'>
        <Button
          className="game-window_reset-btn"
          text="Начать заного"
          onButtonClick={() => this.handleResetButtonClick()}/>
        <GameScore
          score = {this.props.score}/>
        <CardBoard
          cards={this.props.cards}
          onCardClick = {this.props.chooseCard}
          needCompare = {this.props.needCompare}
        />
      </div>
    );
  }
}

const mapStateToProps = state =>
  ({
    p: state,
    cards: state.cardBoard.cardList,
    pair: state.cardBoard.comparePair.pair,
    needCompare: state.cardBoard.comparePair.needCompare,
    score: state.gameInfo.score,
  });

const actions = {
  flipAllCards,
  chooseCard,
  compareCards,
  startGame,
};

export default connect(mapStateToProps, actions)(GameWindow);
