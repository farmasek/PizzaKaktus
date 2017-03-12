import {
  LOGIN_DIALOG,
  LOGIN_FORM_CHANGE,
  LOGIN,
  LOGIN_FORM_ERRORS,
  FETCH_MYSELF,
  LOGOUT,
  USERPWD_CONFIRM_CHANGE,
  USERPWD_CHANGE_FORM_VALUE,
  PASSWORD_CHANGE_DIALOG,
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
  old: '',
  new: '',
  newAgain: '',
  changeMessage: '',
  dialog: false,
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
      case PASSWORD_CHANGE_DIALOG: {
        const dialogState = state.get('dialog');
        return state.set('dialog', !dialogState);
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
        localStorage.clear();
        return state.withMutations(s => s
        .set('loginError', action.payload)
        .set('logging', false));
      }
      case `${LOGIN}_FULFILLED`: {
        return state.withMutations(s => s
        .set('loginError', '')
        .set('dialogState', false)
        .set('logging', false));
      }
      case `${FETCH_MYSELF}_FULFILLED`: {
        return state.set('user', mapUser(action.user));
      }
      case `${LOGOUT}_FULFILLED`: {
        return state.withMutations(s => s
        .set('user', new User())
        .set('loginForm', initialLoginForm)
        .set('loginErrors', initialLoginForm));
      }
      case USERPWD_CHANGE_FORM_VALUE: {
        const newPassword = action.input === 'new' ? action.value : state.get('new');
        const newPasswordAgain = action.input === 'newAgain' ? action.value : state.get('newAgain');
        let message = '';
        if (newPassword && newPasswordAgain && (newPassword !== newPasswordAgain)) {
          message = 'Hesla nejsou stejná';
        }
        return state.withMutations(s => s
        .set(action.input, action.value)
        .set('changeMessage', message));
      }
      case `${USERPWD_CONFIRM_CHANGE}_FULFILLED`: {
        return state.withMutations(s => s
        .set('changeMessage', 'Heslo úspěšně změněno')
        .set('old', '')
        .set('new', '')
        .set('newAgain', '')
        .set('dialog', false));
      }

      case `${USERPWD_CONFIRM_CHANGE}_REJECTED`: {
        return state.set('changeMessage', 'Heslo úspěšně změněno');
      }
      default:
        return state;
    }
  };

export default loginReducer;
