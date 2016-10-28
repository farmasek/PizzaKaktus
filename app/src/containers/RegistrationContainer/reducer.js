import {
  REGISTRATION_CHANGE_FORM_VALUE,
} from './constants';
import { Record, fromJS } from 'immutable';

const InitialState = new Record(
  {
    registrationForm: fromJS({
      firstName: '',
      lastName: '',
      password: '',
      login: '',
      role: 'employee',
      phone: '',
    }),
  }
);

const registrationReducer =
  (state = new InitialState(), action) => {
    switch (action.type) {
      case `${REGISTRATION_CHANGE_FORM_VALUE}`: {
        return state.setIn(['registrationForm', action.input], action.value);
      }
      default:
        return state;
    }
  };

export default registrationReducer;
