import React from 'react';

const Card = ({ 
  card, 
  onCardClick, 
  flipped,
  guessed
}) => {
  const cN = `card ${flipped ? 'flipped' : ''} ${guessed ? 'guessed' : ''}`;
  return (
    <div
      className={cN}
      onClick={onCardClick}
    >
    <div className="card-flipper">
      <div className='card-front'>
        <img className='card-image' src={`./images/cards/${card}.png`} alt={card}/>
      </div>

      <div className='card-back'>
        <img className='card-back-image' src={'./images/cards/cat.jpg'} alt='card-back' />
      </div>
    </div>
  </div>
  );
};

export default Card;
