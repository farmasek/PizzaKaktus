import {
  FETCH_USER_LIST,
  USER_CHANGE_FORM_VALUE,
  USER_DELETE,
  USER_VALIDATION,
  USER_DIALOG,
} from './constants';
import { Record, List, Map } from 'immutable';

const initialUserForm = new Map({
  firstName: '',
  lastName: '',
  password: '',
  login: '',
  roles: new List(),
  phone: '',
});

const initialUserErrors = {
  firstNameErr: '',
  lastNameErr: '',
  passwordErr: '',
  loginErr: '',
  rolesErr: '',
  phoneErr: '',
};

export const initialDialog = {
  showDialog: false,
  id: null,
  firstName: '',
  lastName: '',
};

const InitialState = new Record(
  {
    loading: false,
    users: new List(),
    userForm: initialUserForm,
    userErrors: initialUserErrors,
    dialog: initialDialog,
  }
);

const userReducer =
  (state = new InitialState(), action) => {
    switch (action.type) {
      case `${FETCH_USER_LIST}`: {
        return state.withMutations(s => s
          .set('loading', true)
          .set('userErrors', initialUserErrors)
          .set('dialog', initialDialog)
          .set('userForm', initialUserForm)
        );
      }
      case `${FETCH_USER_LIST}_FULFILLED`: {
        return state.withMutations(s => s
          .set('users', new List(action.response))
          .set('loading', false));
      }
      case `${FETCH_USER_LIST}_FAILED`: {
        return state.withMutations(s => s
          .set('users', new List())
          .set('loading', false)
        );
      }
      case `${USER_CHANGE_FORM_VALUE}`: {
        return state.setIn(['userForm', action.input], action.value);
      }
      case USER_VALIDATION: {
        return state.withMutations(s => s
          .set('userErrors', action.userErrors));
      }
      case USER_DELETE: {
        return state.set('dialog', false);
      }
      case USER_DIALOG: {
        return state.set('dialog', action.dialog);
      }
      default:
        return state;
    }
  };

export default userReducer;
