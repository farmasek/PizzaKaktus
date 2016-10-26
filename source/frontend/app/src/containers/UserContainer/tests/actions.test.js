import expect from 'expect';
import {
  ingredientDefaultAction,
} from '../actions';
import {
  INGREDIENT_DEFAULT_ACTION,
} from '../constants';

describe('Ingredient actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: INGREDIENT_DEFAULT_ACTION,
      };
      expect(ingredientDefaultAction()).toEqual(expected);
    });
  });
});
