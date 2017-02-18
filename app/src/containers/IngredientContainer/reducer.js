import {
  FETCH_INGREDIENT_LIST,
  INGREDIENT_CHANGE_FORM_VALUE,
  INGREDIENT_VALIDATION,
  INGREDIENT_CREATE_NEW,
} from './constants';
import { Record, Map } from 'immutable';

const initialIngredientErrors = {
  nameErr: '',
  amountErr: '',
  costErr: '',
  costCustomErr: '',
};

const initialIngredientForm = new Map({
  name: '',
  amount: '',
  cost: 0,
  costCustom: 0,
});

const InitialState = new Record(
  {
    isLoading: false,
    ingredients: new Map(),
    ingredientForm: initialIngredientForm,
    ingredientErrors: initialIngredientErrors,
    ingredientError: '',
  }
);

const ingredientReducer =
  (state = new InitialState(), action) => {
    switch (action.type) {
      case `${FETCH_INGREDIENT_LIST}`: {
        return state.withMutations(s => s
        .set('isLoading', true)
        .set('ingredientErrors', initialIngredientErrors)
        .set('ingredientForm', initialIngredientForm));
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
      case INGREDIENT_VALIDATION: {
        return state.withMutations(s => s
        .set('ingredientErrors', action.ingredientErrors));
      }
      case `${INGREDIENT_CREATE_NEW}_FAILED`: {
        return state.withMutations(s => s
        .set('ingredientError', action.ingredientError));
      }
      default:
        return state;
    }
  };

export default ingredientReducer;
