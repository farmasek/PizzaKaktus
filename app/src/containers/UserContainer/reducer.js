import {
  FETCH_USER_LIST,
  USER_CHANGE_FORM_VALUE,
  USER_CREATE_NEW,
  USER_SNACKBAR,
  USER_UPDATE_FIELD,
  USER_DELETE,
  USER_VALIDATION,
} from './constants';
import { Record, List, Map } from 'immutable';
import { mapSnackbar } from '../../models/Snackbar';

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

const initialSnackbar = mapSnackbar(false, 'check_circle', 'Uživatel byl úspěšně vytvořen.');

const InitialState = new Record(
  {
    loading: false,
    users: new List(),
    userForm: initialUserForm,
    userErrors: initialUserErrors,
    userError: '',
    snackbar: initialSnackbar,
  }
);

const userReducer =
  (state = new InitialState(), action) => {
    switch (action.type) {
      case `${FETCH_USER_LIST}`: {
        const snackbar = action.created
          ? initialSnackbar.set('showSnackbar', true)
          : initialSnackbar;
        return state.withMutations(s => s
        .set('loading', true)
        .set('userErrors', initialUserErrors)
        .set('snackbar', snackbar)
        .set('userForm', initialUserForm)
        .set('userError', ''));
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
          .set('userError', action.userError)
          .set('snackbar', mapSnackbar(true, 'error', action.userError)));
      }
      case `${USER_CHANGE_FORM_VALUE}`: {
        return state.setIn(['userForm', action.input], action.value);
      }
      case USER_VALIDATION: {
        return state.withMutations(s => s
        .set('userErrors', action.userErrors));
      }
      case USER_SNACKBAR: {
        return state.withMutations(s => s
        .setIn(['snackbar', 'showSnackbar'], false));
      }
      case `${USER_CREATE_NEW}_FAILED`: {
        return state.withMutations(s => s
        .set('userError', action.userError)
        .set('snackbar', mapSnackbar(true, 'error', action.userError)));
      }
      case `${USER_UPDATE_FIELD}_FAILED`: {
        return state.withMutations(s => s
        .set('userError', action.userError)
        .set('snackbar', mapSnackbar(true, 'error', action.userError)));
      }
      case `${USER_DELETE}_FAILED`: {
        return state.withMutations(s => s
        .set('userError', action.userError)
        .set('snackbar', mapSnackbar(true, 'error', action.userError)));
      }
      default:
        return state;
    }
  };

export default userReducer;
