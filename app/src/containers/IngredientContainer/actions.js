import {
  FETCH_INGREDIENT_LIST,
} from './constants';

import { doIt, hosts } from '../../network';
import { Observable } from 'rxjs';

// ingredientdefaultAction :: None -> {Action}
export const fetchIngredientList = () => ({
  type: FETCH_INGREDIENT_LIST,
});

export const fetchIngredientListEpic = action$ =>
  action$.ofType(FETCH_INGREDIENT_LIST)
    .switchMap(() =>
      Observable.ajax(doIt(hosts.pk, 'ingredient/all-ingredients', 'GET', {}))
        .map(({ response }) => ({
          type: `${FETCH_INGREDIENT_LIST}_FULFILLED`,
          response,
        }))
        .catch(() =>
          Observable.of({
            type: `${FETCH_INGREDIENT_LIST}_FAILED}`,
          }))
    );
