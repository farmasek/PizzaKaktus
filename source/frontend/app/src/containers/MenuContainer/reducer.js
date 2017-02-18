import {
  FETCH_MENU,
} from './constants';
import { Record, List } from 'immutable';
import { mapPizza } from '../../models/Pizza';

const InitialState = new Record({
  loading: false,
  menu: new List(),
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
      default:
        return state;
    }
  };

export default menuReducer;
