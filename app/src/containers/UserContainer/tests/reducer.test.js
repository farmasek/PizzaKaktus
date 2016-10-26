import expect from 'expect';
import expectImmutable from 'expect-immutable';
import ingredientReducer from '../reducer';
import { Record } from 'immutable'

expect.extend(expectImmutable);

const InitialState = new Record({
  // Initial State goes here!
    initialStateItem: null,
});

describe('ingredientReducer', () => {
  it('returns the initial state', () => {
    expect(
      ingredientReducer(undefined, {})
    ).toEqualImmutable(new InitialState());
  });
});
