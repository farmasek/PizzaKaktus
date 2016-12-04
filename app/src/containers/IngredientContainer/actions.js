import {
  FETCH_INGREDIENT_LIST,
  INGREDIENT_CHANGE_FORM_VALUE,
  INGREDIENT_CREATE_NEW,
  INGREDIENT_VALIDATION,
  INGREDIENT_SNACKBAR,
} from './constants';
import { mapIngredient } from '../../models/Ingredient';
import { doIt, hosts } from '../../network';
import { Observable } from 'rxjs';
import { Map } from 'immutable';

export const fetchIngredientList = () => ({
  type: FETCH_INGREDIENT_LIST,
});

export const changeValue = (input, value) => ({
  type: INGREDIENT_CHANGE_FORM_VALUE,
  input,
  value,
});

export const saveIngredient = () => ({
  type: INGREDIENT_CREATE_NEW,
});


export const ingredientValidation = (ingredientErrors) => ({
  type: INGREDIENT_VALIDATION,
  ingredientErrors,
});

export const handleSnackbar = (value) => ({
  type: INGREDIENT_SNACKBAR,
  value,
});

export const saveIngredientListEpic = (action$, store$) =>
  action$.ofType(INGREDIENT_CREATE_NEW)
    .switchMap(() =>
      Observable.ajax(doIt(hosts.pk, 'ingredient/add', 'POST',
        JSON.stringify(store$.getState().ingredientContainer.ingredientForm)
        , true))
        .map(() => ({
          type: `${FETCH_INGREDIENT_LIST}`,
          created: true,
        }))
        .catch(error =>
          Observable.of({
            type: `${INGREDIENT_CREATE_NEW}_FAILED}`,
            ingredientError: error.xhr.response,
            showSnackbar: true,
          }))
    );

function arrayToMap(array) {
  let mapa = new Map();
  array.map((value) => {
    mapa = mapa.set(value.id, mapIngredient(value));
  });
  return mapa;
}

export const fetchIngredientListEpic = action$ =>
  action$.ofType(FETCH_INGREDIENT_LIST)
    .switchMap(() =>
      Observable.ajax(doIt(hosts.pk, 'ingredient/all-ingredients', 'GET', {}))
        .map(({ response }) => ({
          type: `${FETCH_INGREDIENT_LIST}_FULFILLED`,
          response: arrayToMap(response),
        }))
        .catch(error =>
          Observable.of({
            type: `${FETCH_INGREDIENT_LIST}_FAILED}`,
            ingredientError: error.xhr.response,
            showSnackbar: true,
          }))
    );
