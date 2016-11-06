/**
 * Created by e-myslivost on 6.11.2016.
 */
import {
  FETCH_PIZZA_LIST,
  PIZZA_CHANGE_FORM_VALUE,
} from './constants';
import { Record, List, fromJS } from 'immutable';

const InitialState = new Record(
  {
    // Initial State goes here!
    loading: false,
    pizzas: new List(),
    pizzaForm: fromJS({
      title: '',
      category_id: null,
    }),
  }
);

const pizzaReducer =
  (state = new InitialState(), action) => {
    switch (action.type) {
      case `${FETCH_PIZZA_LIST}`: {
        return state.set('loading', true);
      }
      case `${FETCH_PIZZA_LIST}_FULFILLED`: {
        return state.withMutations(s => s.set('pizzas', new List(action.response))
          .set('loading', false));
      }
      case `${FETCH_PIZZA_LIST}_FAILED`: {
        return state.withMutations(s => s.set('pizzas', new List())
          .set('loading', false));
      }
      case `${PIZZA_CHANGE_FORM_VALUE}`: {
        return state.setIn(['pizzaForm', action.input], action.value);
      }
      default:
        return state;
    }
  };

export default pizzaReducer;
