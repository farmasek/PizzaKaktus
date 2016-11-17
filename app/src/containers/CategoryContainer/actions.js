/**
 * Created by e-myslivost on 6.11.2016.
 */
import {
  FETCH_CATEGORY_LIST,
  CATEGORY_CHANGE_FORM_VALUE,
  CATEGORY_CREATE_NEW,
} from './constants';
import { doIt, hosts } from '../../network';
import { Observable } from 'rxjs';
import { Map } from 'immutable';
import { mapCategory } from '../../models/Category';

export const fetchCategoryList = () => ({
  type: FETCH_CATEGORY_LIST,
});

export const changeValue = (input, value) => ({
  type: CATEGORY_CHANGE_FORM_VALUE,
  input,
  value,
});

export const saveCategory = () => ({
  type: CATEGORY_CREATE_NEW,
});

// TODO create model
export const saveCategoryListEpic = (action$, store$) =>
  action$.ofType(CATEGORY_CREATE_NEW)
    .switchMap(() =>
      Observable.ajax(doIt(hosts.pk, 'category/add', 'POST',
        JSON.stringify(store$.getState().categoryContainer.categoryForm)
        , true))
        .map(() => ({
          type: `${FETCH_CATEGORY_LIST}`,
        }))
        .catch(() =>
          Observable.of({
            type: `${CATEGORY_CREATE_NEW}_FAILED}`,
          }))
    );

function arrayToMap(array) {
  let mapa = new Map();
  array.map((value) => {
    mapa = mapa.set(value.id, mapCategory(value));
  });
  return mapa;
}

export const fetchCategoryListEpic = action$ =>
  action$.ofType(FETCH_CATEGORY_LIST)
    .switchMap(() =>
      Observable.ajax(doIt(hosts.pk, 'category/all-categories', 'GET', {}))
        .map(({ response }) => ({
          type: `${FETCH_CATEGORY_LIST}_FULFILLED`,
          response: arrayToMap(response),
        }))
        .catch(() =>
          Observable.of({
            type: `${FETCH_CATEGORY_LIST}_FAILED}`,
          }))
    );
