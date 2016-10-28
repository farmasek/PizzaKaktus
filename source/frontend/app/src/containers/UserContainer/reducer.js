import {
  FETCH_USER_LIST,
  USER_CHANGE_FORM_VALUE,
} from './constants';
import { Record, List, fromJS } from 'immutable';

const InitialState = new Record(
  {
    loading: false,
    users: new List(),
    userForm: fromJS({
      firstName: '',
      lastName: '',
      password: '',
      login: '',
      rule: '',
      phone: '',
    }),
  }
);

const userReducer =
  (state = new InitialState(), action) => {
    switch (action.type) {
      case `${FETCH_USER_LIST}`: {
        return state.set('loading', true);
      }
      case `${FETCH_USER_LIST}_FULFILLED`: {
        return state.withMutations(s => s.set('users', new List(action.response))
          .set('loading', false));
      }
      case `${FETCH_USER_LIST}_FAILED`: {
        return state.withMutations(s => s.set('users', new List())
          .set('loading', false));
      }
      case `${USER_CHANGE_FORM_VALUE}`: {
        return state.setIn(['userForm', action.input], action.value);
      }
      default:
        return state;
    }
  };

export default userReducer;
