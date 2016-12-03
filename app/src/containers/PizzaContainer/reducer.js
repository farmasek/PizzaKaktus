import {
  FETCH_PIZZA_LIST,
  PIZZA_CHANGE_FORM_VALUE,
  PIZZA_VALIDATION,
  PIZZA_SNACKBAR,
  PIZZA_COPY,
  PIZZA_CREATE_NEW,
} from './constants';
import { Record, Map, List } from 'immutable';
import { mapPizzaForm } from '../../models/Pizza';
import { mapSnackbar } from '../../models/Snackbar';

const initialPizzaForm = new Map({
  title: '',
  categoryId: '',
  ingredientsId: new List(),
  price: 0,
  active: true,
});

const initialPizzaErrors = {
  titleErr: '',
  categoryErr: '',
  ingredientsErr: '',
  priceErr: '',
};

const initialSnackbar = mapSnackbar(false, 'check_circle', 'Pizza úspěšně vytvořena');

const InitialState = new Record(
  {
    loading: false,
    pizzas: new Map(),
    pizzaForm: initialPizzaForm,
    pizzaErrors: initialPizzaErrors,
    pizzaError: '',
    snackbar: initialSnackbar,
    copied: false,
  }
);

const pizzaReducer =
  (state = new InitialState(), action) => {
    switch (action.type) {
      case `${FETCH_PIZZA_LIST}`: {
        if (action.created) {
          const snackbar = initialSnackbar.set('showSnackbar', true);
          return state.withMutations(s => s
          .set('pizzaForm', initialPizzaForm)
          .set('pizzaErrors', initialPizzaErrors)
          .set('snackbar', snackbar)
          .set('pizzaError', ''));
        }
        return state.withMutations(s => s
        .set('loading', true)
        .set('pizzaForm', initialPizzaForm)
        .set('pizzaErrors', initialPizzaErrors)
        .set('snackbar', initialSnackbar)
        .set('pizzaError', ''));
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
        return state.withMutations(s => s
        .setIn(['pizzaForm', action.input], action.value)
        .set('copied', false));
      }
      case PIZZA_VALIDATION: {
        return state.withMutations(s => s
          .set('pizzaErrors', action.pizzaErrors));
      }
      case PIZZA_SNACKBAR: {
        return state.withMutations(s => s
          .setIn(['snackbar', 'showSnackbar'], false));
      }
      case PIZZA_COPY: {
        return state.withMutations(s => s
        .set('pizzaForm', mapPizzaForm(action.pizza))
        .set('copied', true));
      }
      case `${PIZZA_CREATE_NEW}_FAILED}`: {
        return state.withMutations(s => s
        .set('pizzaError', action.pizzaError)
        .set('snackbar', mapSnackbar(true, 'error', action.pizzaError)));
      }
      default:
        return state;
    }
  };

export default pizzaReducer;
