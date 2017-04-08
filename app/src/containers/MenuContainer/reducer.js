import {
  FETCH_MENU,
  TOGGLE_CUSTOM_PIZZA_DIALOG,
  CUSTOM_PIZZA_EDIT,
  CUSTOM_PIZZA_VALIDATION,
} from './constants';
import { Record, List } from 'immutable';
import { mapPizza, mapPizzaData } from '../../models/Pizza';

const initialCustomPizza = mapPizzaData(null, '', null, [], null, true);

const InitialState = new Record({
  loading: false,
  menu: new List(),
  customPizza: initialCustomPizza,
  customActive: false,
  customPizzaErrors: {
    title: '',
    ingredientsId: '',
  },
});

const menuReducer =
  (state = new InitialState(), action) => {
    switch (action.type) {
      case FETCH_MENU: {
        return state.withMutations(s => s
          .set('loading', true)
        );
      }
      case `${FETCH_MENU}_FULFILLED`: {
        return state.withMutations(s => s
          .set('menu', new List(action.menu.map(item => mapPizza(item))))
          .set('loading', false)
        );
      }
      case `${FETCH_MENU}_FAILED`: {
        return state.withMutations(s => s
          .set('loading', false)
        );
      }
      case TOGGLE_CUSTOM_PIZZA_DIALOG: {
        if (state.get('customActive')) {
          return state.withMutations(s => s
            .set('customPizza', initialCustomPizza)
            .set('customActive', !state.get('customActive')));
        }
        return state.set('customActive', !state.get('customActive'));
      }
      case CUSTOM_PIZZA_EDIT: {
        return state.withMutations(s => s
          .setIn(['customPizza', action.field], action.value)
          .setIn(['customPizza', 'price'], action.price));
      }
      case CUSTOM_PIZZA_VALIDATION: {
        return state.set('customPizzaErrors', action.pizzaErrors);
      }
      default:
        return state;
    }
  };

export default menuReducer;
