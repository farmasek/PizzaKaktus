import {
  FETCH_PIZZA_LIST,
  PIZZA_CHANGE_FORM_VALUE,
  PIZZA_CREATE_NEW,
  PIZZA_VALIDATION,
  PIZZA_SNACKBAR,
  PIZZA_UPDATE,
  PIZZA_COPY,
  PIZZA_PAG_PROPERTIES,
  PIZZA_DIALOG,
} from './constants';
import { doIt, hosts } from '../../network';
import { Observable } from 'rxjs';
import { fromJS } from 'immutable';

export const pizzaValidation = (pizzaErrors) => ({
  type: PIZZA_VALIDATION,
  pizzaErrors,
});

export const handleSnackbar = (value) => ({
  type: PIZZA_SNACKBAR,
  value,
});

export const changeValue = (input, value) => ({
  type: PIZZA_CHANGE_FORM_VALUE,
  input,
  value,
});

export const savePizza = () => ({
  type: PIZZA_CREATE_NEW,
});

export const savePizzaListEpic = (action$, store$) =>
  action$.ofType(PIZZA_CREATE_NEW)
    .switchMap(() =>
      Observable.ajax(doIt(
        hosts.pk,
        'pizza/add',
        'POST',
        JSON.stringify(store$.getState().pizzaContainer.pizzaForm),
        true,
      ))
        .switchMap(() => [{
          type: `${FETCH_PIZZA_LIST}`,
          created: true,
        },
          {
            type: `NOTIF_ADD`,
            notification: {
              message: 'Pizza vytvořena',
            },
          },
        ])
        .catch(error =>
          Observable.of({
            type: `NOTIF_ADD`,
            notification: {
              message: error.xhr.response,
              barStyle: { color: '#e57373' },
            },
          }))
    );

export const changePaginationProperties = (paginationType, value) => ({
  type: PIZZA_PAG_PROPERTIES,
  paginationType,
  value,
});

export const fetchPizzaList = () => ({
  type: FETCH_PIZZA_LIST,
});

const fetchPizzaTable = (pagination) =>
  Observable.ajax(doIt(hosts.pk, `pizza/all-pizzas?page=${
    pagination.get('number')
    }&size=${
    pagination.get('size')
    }&sort=${
    pagination.get('sortBy')
    },${
    pagination.get('sortDir')
    }&filterBy=${
    pagination.get('filterBy')
    }`, 'GET', {}))
    .map(({ response }) => ({
      type: `${FETCH_PIZZA_LIST}_FULFILLED`,
      response,
    }))
    .catch(error =>
      Observable.of({
        type: `NOTIF_ADD`,
        notification: {
          message: error.xhr.response,
          barStyle: { color: '#e57373' },
        },
      })
    );

export const fetchPizzaListEpic = (action$, store) =>
  action$.ofType(FETCH_PIZZA_LIST)
    .map(() => store.getState().pizzaContainer.get('pagination'))
    .switchMap((pagination) => fetchPizzaTable(pagination)
    );

export const fetchPizzaAfterPaginationChange = (action$, store) =>
  action$.ofType(PIZZA_PAG_PROPERTIES)
    .debounceTime(250)
    .map(() => store.getState().pizzaContainer.get('pagination'))
    .switchMap((pagination) => fetchPizzaTable(pagination)
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
        .switchMap(() => ([{
          type: `${FETCH_PIZZA_LIST}`,
        },
          {
            type: `NOTIF_ADD`,
            notification: {
              message: 'Pizza byla upravena',
            },
          },
        ]))
        .catch((error) =>
          Observable.of({
            type: `NOTIF_ADD`,
            notification: {
              message: error.xhr.response,
              barStyle: { color: '#e57373' },
            },
          }))
    );

export const copyPizza = (pizza) => ({
  type: PIZZA_COPY,
  pizza,
});

export const handleDialog = (showDialog, pizza) => ({
  type: PIZZA_DIALOG,
  dialog: {
    showDialog,
    pizza,
  },
});
