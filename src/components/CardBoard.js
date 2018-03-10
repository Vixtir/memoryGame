import React from 'react';
import Card from './Card';

class CardBoard extends React.Component {
  render() {
    const {
      cards,
      needCompare,
      onCardClick
    } = this.props;

    return (<div className='card-board' data-tid="Deck">
      { cards.map(card =>
          <Card
            key={card.id}
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
