import reducer, * as cardBoard from '../reducers/cardBoard';
import { startGame, flipAllCards, flipCard, compareCards } from '../actions';

describe('cardBoard reducer', () => {
  it('return initial state', () => {
    const expectedState = {
      cardIds: [],
      byId: {},
      comparePair: {
        needCompare: false,
        pair: [],
      },
    };

    expect(reducer(undefined, {})).toEqual(expectedState);
  });

  describe('after start game', () => {
    let state;
    beforeAll(() => {
      state = reducer({}, startGame());
    });

    it('18 cards in deck', () => {
      expect(cardBoard.getCards(state).length).toBe(18);
    });

    it('9 unique pair in deck', () => {
      const cards = cardBoard.getCards(state);
      const uniquePairs = [];
      cards.forEach((card) => {
        if (!uniquePairs.includes(card.cardType)) {
          uniquePairs.push(card.cardType);
        }
      });
      expect(uniquePairs.length).toBe(9);
    });

    it('all cards arent flipped', () => {
      const cards = cardBoard.getCards(state);
      const allDontFlip = cards.reduce((flip, card) => {
        return flip || card.flipped;
      }, false);

      expect(allDontFlip).toBe(false);
    });

    describe('after flip all cards', () => {
      beforeAll(() => {
        state = reducer(state, flipAllCards());
      });

      it('all cards are flipped', () => {
        const cards = cardBoard.getCards(state);
        const allDontFlip = cards.reduce((flip, card) => {
          return flip && card.flipped;
        }, true);

        expect(allDontFlip).toBe(true);
      });

      describe('compare cards', () => {
        let firstCard;
        let sameCard;
        let otherCard;


        beforeAll(() => {
          const [first, ...rest] = cardBoard.getCards(state);
          firstCard = first;
          sameCard = rest.find(card => card.cardType === firstCard.cardType);
          otherCard = rest.find(card => card.cardType !== firstCard.cardType);
        });

        describe('compare cards with same types', () => {
          let localState;
          beforeAll(() => {
            localState = { ...state };
            localState = reducer(localState, flipCard(firstCard));
            localState = reducer(localState, flipCard(sameCard));
          });

          it('need compare', () => {
            expect(localState.comparePair.needCompare).toBe(true);
          });

          describe('compare', () => {
            beforeAll(() => {
              localState = reducer(localState, compareCards(cardBoard.getPair(localState)));
            });

            it('dont need compare', () => {
              expect(localState.comparePair.needCompare).toBe(false);
            });

            it('compare pair empty', () => {
              expect(cardBoard.getPair(localState).length).toBe(0);
            });

            it('2 guessed cards on board', () => {
              const guessedCards = cardBoard.getCards(localState).filter(card =>
                card.guessed === true);

              expect(guessedCards.length).toBe(2);
            });
          });
        });

        describe('compare cards with different types', () => {
          let localState;
          beforeAll(() => {
            localState = { ...state };
            localState = reducer(localState, flipCard(firstCard));
            localState = reducer(localState, flipCard(otherCard));
          });

          describe('compare', () => {
            beforeAll(() => {
              localState = reducer(localState, compareCards(cardBoard.getPair(localState)));
            });

            it('dont need compare', () => {
              expect(localState.comparePair.needCompare).toBe(false);
            });

            it('compare pair empty', () => {
              expect(cardBoard.getPair(localState).length).toBe(0);
            });

            it('guessed cards count didnt change', () => {
              const guessedCards = cardBoard.getCards(localState).filter(card =>
                card.guessed === true);

              expect(guessedCards.length).toBe(0);
            });
          });
        });
      });
    });
  });
});
