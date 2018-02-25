import React from 'react';

const Card = ({ card, onCardClick, flip }) => {
  const cN = flip ? 'card flip' : 'card';
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
        <img className='card-back-image' src={'./images/cards/back.png'} alt='card-back' />
      </div>
    </div>
  </div>
  );
};

export default Card;
