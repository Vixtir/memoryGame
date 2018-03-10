import reducer, { initialState } from './gameInfo';
import cardReducer from './card';
import { addCard, startGame, compareCards} from '../actions';

describe('gameInfo reducer', () => {
  it('return init state', () => {
    const expectedState = {
      stage: 'start',
      score: 0,
      unOpenPairs: 9,
    };

    expect(reducer(undefined, {})).toEqual(expectedState);
  });

  describe('action', () => {
    const state = {
      stage: 'start',
      score: 0,
      unOpenPairs: 9,
    };

    it('startGame', () => {
      const expectedState = {
        ...state,
        stage: 'game',
      };

      expect(reducer(state, startGame())).toEqual(expectedState);
    });

    describe('after the game begun', () => {
      describe('comprasion', () => {
        const firstCard = cardReducer({}, addCard(0, '2D'));
        const secondCard = cardReducer({}, addCard(1, '3D'));

        describe('incorrect', () => {
          const pair = [firstCard, secondCard];

          describe('isnt last unopened pair', () => {
            const state = {
              stage: 'game',
              score: 500,
              unOpenPairs: 5,
            };

            it('score decreased', () => {
              // score: 500 - ((9 - 5) * 42)
              const expectedStateScore = 332;
              expect(reducer(state, compareCards(pair)).score)
                .toEqual(expectedStateScore);
            });
          });
        });

        describe('correct', () => {
          const pair = [firstCard, firstCard];
          describe('isnt last unopened pair', () => {
            const state = {
              stage: 'game',
              score: 500,
              unOpenPairs: 5,
            };

            it('score increased ', () => {
              // score: (5 * 42) + 500
              const expectedStateScore = 710;
              expect(reducer(state, compareCards(pair)).score)
                .toEqual(expectedStateScore);
            });

            it('unOpenPairs decreased ', () => {
              // score: (5 * 42) + 500
              const expectedUnOpenPairs = 4;
              expect(reducer(state, compareCards(pair)).unOpenPairs)
                .toEqual(expectedUnOpenPairs);
            });
          });

          describe('is last unopened pair', () => {
            const state = {
              stage: 'game',
              score: 500,
              unOpenPairs: 1,
            };

            it('end game', () => {
              const expectedStage = 'end';
              expect(reducer(state, compareCards(pair)).stage)
                .toEqual(expectedStage);
            });
          });
        });
      });
    });
  });
});
