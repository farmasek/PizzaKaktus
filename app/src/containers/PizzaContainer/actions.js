/**
 * Created by e-myslivost on 6.11.2016.
 */
import {
  FETCH_PIZZA_LIST,
  PIZZA_CHANGE_FORM_VALUE,
  PIZZA_CREATE_NEW,
} from './constants';

import { doIt, hosts } from '../../network';
import { Observable } from 'rxjs';

// pizzadefaultAction :: None -> {Action}
export const fetchPizzaList = () => ({
  type: FETCH_PIZZA_LIST,
});
export const changeValue = (input, value) => ({
  type: PIZZA_CHANGE_FORM_VALUE,
  input,
  value,
});
export const savePizza = () => ({
  type: PIZZA_CREATE_NEW,
});
// TODO create model
export const savePizzaListEpic = (action$, store$) =>
  action$.ofType(PIZZA_CREATE_NEW)
    .switchMap(() =>
      Observable.ajax(doIt(hosts.pk, 'pizza/add', 'POST',
        JSON.stringify(store$.getState().pizzaContainer.pizzaForm)
        , true))
        .map(() => ({
          type: `${FETCH_PIZZA_LIST}`,
        }))
        .catch(() =>
          Observable.of({
            type: `${PIZZA_CREATE_NEW}_FAILED}`,
          }))
    );

export const fetchPizzaListEpic = action$ =>
  action$.ofType(FETCH_PIZZA_LIST)
    .switchMap(() =>
      Observable.ajax(doIt(hosts.pk, 'pizza/all-pizzas', 'GET', {}))
        .map(({ response }) => ({
          type: `${FETCH_PIZZA_LIST}_FULFILLED`,
          response,
        }))
        .catch(() =>
          Observable.of({
            type: `${FETCH_PIZZA_LIST}_FAILED}`,
          }))
    );
