import {
  USERPWD_CONFIRM_CHANGE,
  USERPWD_CHANGE_FORM_VALUE,
} from './constants';
import {
  Record,
} from 'immutable';

const InitialState = new Record({
  username: '',
  pwOld: '',
  pw1: '',
  pw2: '',
  validationMessage: '',
});

const changePwdReducer =
  (state = new InitialState(), action) => {
    switch (action.type) {
      case `${USERPWD_CHANGE_FORM_VALUE}`: {
        let newState = state.set(action.input, action.value);
        if (newState.get('pw1') && newState.get('pw2') && newState.get('pw1')
          !== newState.get('pw2')) {
          newState = newState.set('validationMessage', 'Hesla nejsou stejné');
        } else {
          newState = newState.set('validationMessage', '');
        }
        return newState;
      }
      case `${USERPWD_CONFIRM_CHANGE}_FULFILLED`: {
        return state.set('validationMessage', 'Heslo uspěšně změněno');
      }

      case `${USERPWD_CONFIRM_CHANGE}_REJECTED`: {
        return state.set('validationMessage', 'Heslo uspěšně změněno');
      }
      default:
        return state;
    }
  };

export default changePwdReducer;
