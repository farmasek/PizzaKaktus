import {
  FETCH_MENU,
} from './constants';
import { Record, List } from 'immutable';
import { mapSnackbar } from '../../models/Snackbar';
import { mapPizza } from '../../models/Pizza';

const initialSnackbar = mapSnackbar(false, '', '');

const InitialState = new Record({
  loading: false,
  menu: new List(),
  snackbar: initialSnackbar,
  menuError: '',
});

const menuReducer =
  (state = new InitialState(), action) => {
    switch (action.type) {
      case FETCH_MENU: {
        return state.withMutations(s => s
          .set('loading', true)
          .set('menuError', '')
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
          .set('menuError', action.menuError)
        );
      }
      default:
        return state;
    }
  };

export default menuReducer;
