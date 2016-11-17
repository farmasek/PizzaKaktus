import {
  FETCH_PIZZA_LIST,
  PIZZA_CHANGE_FORM_VALUE,
  PIZZA_VALIDATION,
  PIZZA_SNACKBAR,
} from './constants';
import { Record, Map, List } from 'immutable';

const initialPizzaForm = new Map({
  title: '',
  categoryId: '',
  ingredientsId: new List(),
  active: true,
});

const InitialState = new Record(
  {
    loading: false,
    pizzas: new Map(),
    pizzaForm: initialPizzaForm,
    pizzaErrors: {
      titleErr: '',
      categoryErr: '',
      ingredientsErr: '',
    },
    showSnackbar: false,
  }
);

const pizzaReducer =
  (state = new InitialState(), action) => {
    switch (action.type) {
      case `${FETCH_PIZZA_LIST}`: {
        if (action.updated) {
          return state.withMutations(s => s
            .set('showSnackbar', true)
            .set('pizzaForm', initialPizzaForm)
            .set('loading', true));
        }
        return state.set('loading', true);
      }
      case `${FETCH_PIZZA_LIST}_FULFILLED`: {
        return state.withMutations(s => s
          .set('pizzas', action.response)
          .set('loading', false));
      }
      case `${FETCH_PIZZA_LIST}_FAILED`: {
        return state.withMutations(s => s
          .set('pizzas', new Map())
          .set('loading', false));
      }
      case `${PIZZA_CHANGE_FORM_VALUE}`: {
        return state.setIn(['pizzaForm', action.input], action.value);
      }
      case PIZZA_VALIDATION: {
        return state.withMutations(s => s
          .set('pizzaErrors', action.pizzaErrors));
      }
      case PIZZA_SNACKBAR: {
        return state.withMutations(s => s
          .set('showSnackbar', action.value));
      }
      default:
        return state;
    }
  };

export default pizzaReducer;
