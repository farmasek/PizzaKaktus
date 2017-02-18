/**
 * Created by e-myslivost on 6.11.2016.
 */
import {
  FETCH_CATEGORY_LIST,
  CATEGORY_CHANGE_FORM_VALUE,
  CATEGORY_SNACKBAR,
  CATEGORY_VALIDATION,
} from './constants';
import {
  Record,
  Map,
} from 'immutable';

const initialCategoryForm = new Map({
  name: '',
});

const initialCategoryErrors = {
  nameErr: '',
};

const InitialState = new Record(
  {
    loading: false,
    categories: new Map(),
    categoryForm: initialCategoryForm,
    categoryErrors: initialCategoryErrors,
  }
);

const categoryReducer =
  (state = new InitialState(), action) => {
    switch (action.type) {
      case `${FETCH_CATEGORY_LIST}`: {
        return state.withMutations(s => s
          .set('loading', true)
          .set('categoryErrors', initialCategoryErrors)
          );
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
          .set('loading', false)
         );
      }
      case `${CATEGORY_CHANGE_FORM_VALUE}`: {
        return state.setIn(['categoryForm', action.input], action.value);
      }
      case CATEGORY_VALIDATION: {
        return state.withMutations(s => s
          .set('categoryErrors', action.categoryErrors));
      }
      case CATEGORY_SNACKBAR: {
        return state;
      }
      default:
        return state;
    }
  };

export default categoryReducer;
