import React from 'react';
import { connect } from 'react-redux';
import Card from './Card';

class CardBoard extends React.Component {
  componentDidMount() {
    const { cards } = this.props;
    setTimeout(() => {
      cards.forEach((element) => {
        this.props.flipCard(element.idx);
      });
    }, 5000);
  }

  render() {
    const { cards, flipCard } = this.props;

    return (<div className='card-board'>
      { cards.map(card =>
          <Card
            key={card.idx}
            card={card.cardType}
            flip={card.flip}
            onCardClick={() => flipCard(card.idx)}
          />)
      }
    </div>);
  }
}

const mapStateToProps = state =>
  ({
    cards: state.cards,
  });

const mapDispatchToProps = dispatch =>
  ({
    flipCard: idx => dispatch({ type: 'FLIP_CARD', idx }),
  });

export default connect(mapStateToProps, mapDispatchToProps)(CardBoard);
