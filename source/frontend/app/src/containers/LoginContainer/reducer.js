import {
  LOGIN_DIALOG,
  LOGIN_FORM_CHANGE,
  LOGIN,
  LOGIN_FORM_ERRORS,
  SET_USER,
} from './constants';
import { Record, Map } from 'immutable';
import { User, mapUser } from '../../models/User';

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
  user: new User(),
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
        .set('loginError', '')
        .set('logging', false));
      }
      case SET_USER: {
        console.log(action.user);
        return state.set('user', mapUser(action.user[0]));
      }
      default:
        return state;
    }
  };

export default loginReducer;
