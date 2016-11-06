/**
 * Created by e-myslivost on 6.11.2016.
 */
import {
  FETCH_CATEGORY_LIST,
  CATEGORY_CHANGE_FORM_VALUE,
} from './constants';
import { Record, List, fromJS } from 'immutable';

const InitialState = new Record(
  {
    // Initial State goes here!
    loading: false,
    categories: new List(),
    categoryForm: fromJS({
      title: '',
    }),
  }
);

const categoryReducer =
  (state = new InitialState(), action) => {
    switch (action.type) {
      case `${FETCH_CATEGORY_LIST}`: {
        return state.set('loading', true);
      }
      case `${FETCH_CATEGORY_LIST}_FULFILLED`: {
        return state.withMutations(s => s.set('categories', new List(action.response))
          .set('loading', false));
      }
      case `${FETCH_CATEGORY_LIST}_FAILED`: {
        return state.withMutations(s => s.set('categories', new List())
          .set('loading', false));
      }
      case `${CATEGORY_CHANGE_FORM_VALUE}`: {
        return state.setIn(['categoryForm', action.input], action.value);
      }
      default:
        return state;
    }
  };

export default categoryReducer;
