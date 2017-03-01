import { LOGIN_DIALOG, LOGIN_FORM_CHANGE } from './constants';
import { Record } from 'immutable';

const InitialState = new Record({
  dialogState: false,
  loginForm: {
    username: '',
    password: '',
  },
});

const loginReducer =
  (state = new InitialState(), action) => {
    switch (action.type) {
      case LOGIN_DIALOG: {
        const dialogState = state.get('dialogState');
        return state.set('dialogState', !dialogState);
      }
      case LOGIN_FORM_CHANGE: {
        return state;
      }
      default:
        return state;
    }
  };

  export default loginReducer;
