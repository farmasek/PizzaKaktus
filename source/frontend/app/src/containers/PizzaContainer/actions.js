import {
  FETCH_PIZZA_LIST,
  PIZZA_CHANGE_FORM_VALUE,
  PIZZA_CREATE_NEW,
  PIZZA_VALIDATION,
  PIZZA_SNACKBAR,
  PIZZA_UPDATE,
  PIZZA_COPY,
} from './constants';
import { mapPizza } from '../../models/Pizza';
import { doIt, hosts } from '../../network';
import { Observable } from 'rxjs';
import { Map, fromJS } from 'immutable';

export const pizzaValidation = (pizzaErrors) => ({
  type: PIZZA_VALIDATION,
  pizzaErrors,
});

export const handleSnackbar = (value) => ({
  type: PIZZA_SNACKBAR,
  value,
});

function arrayToMap(array) {
  let mapa = new Map();
  array.map((value) => {
    mapa = mapa.set(value.id, mapPizza(value));
  });
  return mapa;
}

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
          updated: true,
        }))
        .catch(() =>
          Observable.of({
            type: `${PIZZA_CREATE_NEW}_FAILED}`,
          }))
    );

export const fetchPizzaList = () => ({
  type: FETCH_PIZZA_LIST,
});

export const fetchPizzaListEpic = action$ =>
  action$.ofType(FETCH_PIZZA_LIST)
    .switchMap(() =>
      Observable.ajax(doIt(hosts.pk, 'pizza/all-pizzas', 'GET', {}))
        .map(({ response }) => ({
          type: `${FETCH_PIZZA_LIST}_FULFILLED`,
          response: arrayToMap(response),
        }))
        .catch(() =>
          Observable.of({
            type: `${FETCH_PIZZA_LIST}_FAILED}`,
          }))
    );

export const updatePizza = (pizza, field, value) => {
  let pizzaMap = fromJS(pizza);
  pizzaMap = pizzaMap.set(field, value);
  return {
    type: PIZZA_UPDATE,
    pizzaMap,
  };
};

export const updatePizzaEpic = (action$) =>
  action$.ofType(PIZZA_UPDATE)
    .switchMap(({ pizzaMap }) =>
      Observable.ajax(doIt(hosts.pk, 'pizza/update', 'PUT',
        pizzaMap, true))
        .map(() => ({
          type: `${FETCH_PIZZA_LIST}`,
        }))
        .catch(() =>
          Observable.of({
            type: `${PIZZA_UPDATE}_FAILED`,
          }))
    );

export const copyPizza = (pizza) => {
  const pizzaForm = new Map({
    title: pizza.get('title'),
    categoryId: pizza.get('categoryId'),
    ingredientsId: pizza.get('ingredientsId'),
    active: true,
  });
  return {
    type: PIZZA_COPY,
    pizzaForm,
  };
};
