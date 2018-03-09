import React from 'react';
import Card from './Card';

class CardBoard extends React.Component {
  render() {
    const {
      cards,
      chooseCard,
      needCompare,
      onCardClick
    } = this.props;

    return (<div className='card-board'>
      { cards.map(card =>
          <Card
            key={card.idx}
            card={card.cardType}
            flipped={card.flipped}
            guessed={card.guessed}
            onCardClick={() => {
                if (card.flipped && !needCompare) {
                  onCardClick(card);
                }
              }
            }
          />)
      }
    </div>);
  }
}

export default CardBoard;
