import {
  FETCH_INGREDIENT_LIST,
  INGREDIENT_CHANGE_FORM_VALUE,
  INGREDIENT_VALIDATION,
  INGREDIENT_SNACKBAR,
  INGREDIENT_CREATE_NEW,
} from './constants';
import { Record, Map } from 'immutable';
import { mapSnackbar } from '../../models/Snackbar';

const initialIngredientErrors = {
  nameErr: '',
  amountErr: '',
  costErr: '',
  costCustomErr: '',
};

const initialSnackbar = mapSnackbar(false, 'check_circle', 'Ingredience byla úspěšně vytvořena.');

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
    snackbar: initialSnackbar,
  }
);

const ingredientReducer =
  (state = new InitialState(), action) => {
    switch (action.type) {
      case `${FETCH_INGREDIENT_LIST}`: {
        const snackbar = action.created
          ? initialSnackbar.set('showSnackbar', true)
          : initialSnackbar;
        return state.withMutations(s => s
        .set('isLoading', true)
        .set('ingredientErrors', initialIngredientErrors)
        .set('snackbar', snackbar)
        .set('ingredientForm', initialIngredientForm)
        .set('ingredientError', ''));
      }
      case `${FETCH_INGREDIENT_LIST}_FULFILLED`: {
        return state.withMutations(s => s
          .set('ingredients', action.response)
          .set('isLoading', false));
      }
      case `${FETCH_INGREDIENT_LIST}_FAILED`: {
        return state.withMutations(s => s
          .set('ingredients', new Map())
          .set('isLoading', false)
          .set('ingredientError', action.ingredientError)
          .set('snackbar', mapSnackbar(action.ingredientError.length > 0 ? true : false,
            'error', action.ingredientError)));
      }
      case `${INGREDIENT_CHANGE_FORM_VALUE}`: {
        return state.setIn(['ingredientForm', action.input], action.value);
      }
      case INGREDIENT_VALIDATION: {
        return state.withMutations(s => s
        .set('ingredientErrors', action.ingredientErrors));
      }
      case INGREDIENT_SNACKBAR: {
        return state.withMutations(s => s
        .setIn(['snackbar', 'showSnackbar'], action.value));
      }
      case `${INGREDIENT_CREATE_NEW}_FAILED`: {
        return state.withMutations(s => s
        .set('ingredientError', action.ingredientError)
        .set('snackbar', mapSnackbar(action.ingredientError.length > 0 ? true : false,
          'error', action.ingredientError)));
      }
      default:
        return state;
    }
  };

export default ingredientReducer;
