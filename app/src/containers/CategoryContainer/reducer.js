/**
 * Created by e-myslivost on 6.11.2016.
 */
import {
  FETCH_CATEGORY_LIST,
  CATEGORY_CHANGE_FORM_VALUE,
  CATEGORY_SNACKBAR,
  CATEGORY_VALIDATION,
  CATEGORY_CREATE_NEW,
} from './constants';
import { Record, Map } from 'immutable';
import { mapSnackbar } from '../../models/Snackbar';

const initialCategoryForm = new Map({
  name: '',
});

const initialCategoryErrors = {
  nameErr: '',
};

const initialSnackbar = mapSnackbar(false, 'check_circle', 'Kategorie byla úspěšně vytvořena.');

const InitialState = new Record(
  {
    loading: false,
    categories: new Map(),
    categoryForm: initialCategoryForm,
    snackbar: initialSnackbar,
    categoryErrors: initialCategoryErrors,
    categoryError: '',
  }
);

const categoryReducer =
  (state = new InitialState(), action) => {
    switch (action.type) {
      case `${FETCH_CATEGORY_LIST}`: {
        const snackbar = action.created
          ? initialSnackbar.set('showSnackbar', true)
          : initialSnackbar;
        return state.withMutations(s => s
        .set('loading', true)
        .set('categoryErrors', initialCategoryErrors)
        .set('categoryError', '')
        .set('snackbar', snackbar));
      }
      case `${FETCH_CATEGORY_LIST}_FULFILLED`: {
        return state.withMutations(s => s
          .set('categories', action.response)
          .set('categoryForm', initialCategoryForm)
          .set('loading', false));
      }
      case `${FETCH_CATEGORY_LIST}_FAILED`: {
        return state.withMutations(s => s
          .set('categories', new Map())
          .set('loading', false));
      }
      case `${CATEGORY_CHANGE_FORM_VALUE}`: {
        return state.setIn(['categoryForm', action.input], action.value);
      }
      case CATEGORY_VALIDATION: {
        return state.withMutations(s => s
        .set('categoryErrors', action.categoryErrors));
      }
      case CATEGORY_SNACKBAR: {
        return state.withMutations(s => s
        .setIn(['snackbar', 'showSnackbar'], false));
      }
      case `${CATEGORY_CREATE_NEW}_FAILED}`: {
        return state.withMutations(s => s
        .set('categoryError', action.categoryError)
        .set('snackbar', mapSnackbar(true, 'error', action.categoryError)));
      }
      default:
        return state;
    }
  };

export default categoryReducer;
