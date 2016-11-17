import {
  FETCH_INGREDIENT_LIST,
  INGREDIENT_CHANGE_FORM_VALUE,
} from './constants';
import { Record, Map, fromJS } from 'immutable';

const InitialState = new Record(
  {
    isLoading: false,
    ingredients: new Map(),
    ingredientForm: fromJS({
      name: '',
      amount: null,
      cost: null,
      customCost: null,
    }),
  }
);

const ingredientReducer =
  (state = new InitialState(), action) => {
    switch (action.type) {
      case `${FETCH_INGREDIENT_LIST}`: {
        return state.set('isLoading', true);
      }
      case `${FETCH_INGREDIENT_LIST}_FULFILLED`: {
        return state.withMutations(s => s
          .set('ingredients', action.response)
          .set('isLoading', false));
      }
      case `${FETCH_INGREDIENT_LIST}_FAILED`: {
        return state.withMutations(s => s
          .set('ingredients', new Map())
          .set('isLoading', false));
      }
      case `${INGREDIENT_CHANGE_FORM_VALUE}`: {
        return state.setIn(['ingredientForm', action.input], action.value);
      }
      default:
        return state;
    }
  };

export default ingredientReducer;
