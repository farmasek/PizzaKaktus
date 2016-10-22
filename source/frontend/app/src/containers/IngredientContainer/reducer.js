import {
  FETCH_INGREDIENT_LIST,
} from './constants';
import { Record, List } from 'immutable';

const InitialState = new Record(
  {
    // Initial State goes here!
    loading: false,
    ingredients: new List(),
  }
);

const ingredientReducer =
  (state = new InitialState(), action) => {
    switch (action.type) {
      case `${FETCH_INGREDIENT_LIST}`: {
        return state.set('loading', true);
      }
      case `${FETCH_INGREDIENT_LIST}_FULFILLED`: {
        return state.withMutations(s => s.set('ingredients', new List(action.response))
          .set('loading', false));
      }
      case `${FETCH_INGREDIENT_LIST}_FAILED`: {
        return state.withMutations(s => s.set('ingredients', new List())
          .set('loading', false));
      }
      default:
        return state;
    }
  };

export default ingredientReducer;
