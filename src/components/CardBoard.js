import React from 'react';
import { connect } from 'react-redux';
import Card from './Card';

class CardBoard extends React.Component {
  componentDidMount() {
    setTimeout(this.props.flipAllCards, 5000);
  }

  componentDidUpdate() {
    const {
      needCompare,
      compareCards
    } = this.props;
    setTimeout(() => {
      if (needCompare) compareCards();
    }, 600);
  }

  render() {
    const {
      cards,
      chooseCard,
      needCompare
    } = this.props;

    return (<div className='card-board'>
      { cards.map(card =>
          <Card
            key={card.idx}
            card={card.cardType}
            flip={card.flip}
            onCardClick={() => {
                if (card.flip && !needCompare) {
                  chooseCard(card);
                }
              }
            }
          />)
      }
    </div>);
  }
}

const mapStateToProps = state =>
  ({
    cards: state.gameDeck.cards,
    compareCardList: state.gameDeck.compareCards,
    needCompare: state.gameDeck.needCompare,
  });

const mapDispatchToProps = dispatch =>
  ({
    flipAllCards: () => dispatch({ type: 'FLIP_ALL_CARDS' }),
    chooseCard: card => dispatch({ type: 'CHOOSE_CARD', card }),
    compareCards: () => dispatch({ type: 'COMPARE_CARDS' }),
  });

export default connect(mapStateToProps, mapDispatchToProps)(CardBoard);
