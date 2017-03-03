import {
  LOGIN_DIALOG,
  LOGIN_FORM_CHANGE,
  LOGIN,
  LOGIN_FORM_ERRORS,
} from './constants';
import { Record, Map } from 'immutable';

const initialLoginForm = new Map({
  username: '',
  password: '',
});

const InitialState = new Record({
  logging: false,
  dialogState: false,
  loginForm: initialLoginForm,
  loginErrors: initialLoginForm,
  loginError: '',
});

const loginReducer =
  (state = new InitialState(), action) => {
    switch (action.type) {
      case LOGIN_DIALOG: {
        const dialogState = state.get('dialogState');
        if (!dialogState === false) {
          return state.withMutations(s => s
            .set('dialogState', !dialogState)
            .set('loginForm', initialLoginForm)
            .set('loginErrors', initialLoginForm)
            .set('loginError', ''));
        }
        return state.set('dialogState', !dialogState);
      }
      case LOGIN_FORM_CHANGE: {
        return state.setIn(['loginForm', action.name], action.value);
      }
      case LOGIN_FORM_ERRORS: {
        return state.set('loginErrors', action.loginErrors);
      }
      case LOGIN: {
        return state.set('loginErrors', initialLoginForm);
      }
      case `${LOGIN}_PENDING`: {
        return state.set('logging', true);
      }
      case `${LOGIN}_REJECTED`: {
        return state.withMutations(s => s
        .set('loginError', action.payload)
        .set('logging', false));
      }
      case `${LOGIN}_FULFILLED`: {
        return state.withMutations(s => s
        .set('authError', '')
        .set('logging', false));
      }
      default:
        return state;
    }
  };

export default loginReducer;
