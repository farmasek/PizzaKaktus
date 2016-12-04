import {
  FETCH_PIZZA_LIST,
  PIZZA_CHANGE_FORM_VALUE,
  PIZZA_VALIDATION,
  PIZZA_SNACKBAR,
  PIZZA_COPY,
  PIZZA_CREATE_NEW,
  PIZZA_PAG_PROPERTIES,
} from './constants';
import { Record, Map, List, fromJS } from 'immutable';
import { mapPizzaForm, mapPizza } from '../../models/Pizza';
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

const initialSnackbar = mapSnackbar(false, 'check_circle', 'Pizza byla úspěšně vytvořena');

const InitialState = new Record(
  {
    loading: false,
    pizzas: new Map(),
    pizzaForm: initialPizzaForm,
    pizzaErrors: initialPizzaErrors,
    pizzaError: '',
    snackbar: initialSnackbar,
    copied: false,
    pagination: fromJS({
      totalPages: 0,
      totalElements: 0,
      size: 5,
      number: 0,
      sortDir: 'ASC',
      sortBy: 'id',
      filterBy: '',
    }),
  }
);

const pizzaReducer =
  (state = new InitialState(), action) => {
    switch (action.type) {
      case `${FETCH_PIZZA_LIST}`: {
        const snackbar = action.created
          ? initialSnackbar.set('showSnackbar', true)
          : initialSnackbar;
        return state.withMutations(s => s
          .set('loading', true)
          .set('pizzaErrors', initialPizzaErrors)
          .set('snackbar', snackbar)
          .set('copied', false)
          .set('pizzaError', ''));
      }
      case `${FETCH_PIZZA_LIST}_FULFILLED`: {
        const { content, totalPages, totalElements, size, number } = action.response;
        const { direction, property } = action.response.sort ? action.response.sort[0] : null;
        let pizzas = new Map();
        content.map(pizza => pizzas = pizzas.set(pizza.id, mapPizza(pizza)));
        return state.withMutations(s => s
          .set('pizzas', pizzas)
          .setIn(['pagination', 'totalPages'], totalPages)
          .setIn(['pagination', 'totalElements'], totalElements)
          .setIn(['pagination', 'size'], size)
          .setIn(['pagination', 'number'], number)
          .setIn(['pagination', 'sortDir'], direction)
          .setIn(['pagination', 'sortBy'], property)
          .set('pizzaForm', initialPizzaForm)
          .set('loading', false));
      }
      case `${FETCH_PIZZA_LIST}_FAILED`: {
        return state.withMutations(s => s
          .set('pizzas', new Map())
          .set('loading', false));
      }
      case `${PIZZA_PAG_PROPERTIES}`: {
        let sortDir = state.getIn(['pagination', 'sortDir']);
        if (action.paginationType === 'sortBy') {
          sortDir = sortDir === 'ASC' ? 'DESC' : 'ASC';
        }
        return state.withMutations(s => s
          .setIn(['pagination', action.paginationType], action.value)
          .setIn(['pagination', 'sortDir'], sortDir)
        );
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
