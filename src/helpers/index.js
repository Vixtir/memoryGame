import * as cardsConstants from '../constants/cards';

const getRandom = maxValue =>
  Math.floor(Math.random() * maxValue);

const getNineRandomNumbers = (maxValue) => {
  const nineRandomNumbers = [];

  while (nineRandomNumbers.length < 9) {
    const value = getRandom(maxValue);

    if (nineRandomNumbers.indexOf(value) === -1) {
      nineRandomNumbers.push(value);
    }
  }

  return nineRandomNumbers;
};

const shuffleArray = (array) => {
  const newArray = array.splice('');
  const l = newArray.length;
  let i = 0;
  while (i < l) {
    const randomIdx = getRandom(l);
    const cache = newArray[randomIdx];
    newArray[randomIdx] = newArray[i];
    newArray[i] = cache;
    i += 1;
  }

  return newArray;
};

const checkPair = (cardPair) => {
  const [firstCard, secondCard] = cardPair;
  return firstCard.cardType === secondCard.cardType;
};

const createCardDeck = (cardSuits, cardValues) =>
  cardSuits
    .reduce((deck, suit) =>
      [...deck, ...cardValues.map(cardValue => `${cardValue}${suit}`)],
    []
  );

const createGameDeck = () => {
  const cardDeck = createCardDeck(cardsConstants.SUITS, cardsConstants.VALUES);
  const nineUniqueIndexes = getNineRandomNumbers(cardDeck.length);
  const cards = nineUniqueIndexes.map(idx => cardDeck[idx]);

  return shuffleArray([...cards, ...cards]);
};

export { createGameDeck, checkPair };
