import {
  FETCH_MENU,
  TOGGLE_CUSTOM_PIZZA_DIALOG,
  CUSTOM_PIZZA_EDIT,
  CUSTOM_PIZZA_VALIDATION,
} from './constants';
import { doIt, hosts } from '../../network';
import { Observable } from 'rxjs';
import { FETCH_INGREDIENT_LIST } from '../IngredientContainer/constants';
import { FETCH_CATEGORY_LIST } from '../CategoryContainer/constants';

export const fetchMenu = () => ({
  type: FETCH_MENU,
});

export const fetchMenuEpic = action$ =>
  action$.ofType(FETCH_MENU)
    .switchMap(() =>
      Observable.ajax(doIt(hosts.pk, 'pizza/active-pizzas', 'GET', {}))
        .switchMap(({ response }) => [
          {
            type: `${FETCH_MENU}_FULFILLED`,
            menu: response,
          },
          {
            type: FETCH_CATEGORY_LIST,
          },
          {
            type: FETCH_INGREDIENT_LIST,
          },
        ])
        .catch(error =>
          Observable.concat(
            Observable.of({
              type: `${FETCH_MENU}_FAILED`,
              menuError: error.xhr.response,
            }),
            Observable.of({
              type: `NOTIF_ADD`,
              notification: {
                message: error.xhr.response,
                barStyle: { color: '#e57373' },
              },
            }))
        ));

export const toggleCustomPizzaForm = () => ({
  type: TOGGLE_CUSTOM_PIZZA_DIALOG,
});

export const editCustomPizzaValue = (field, value, price) => ({
  type: CUSTOM_PIZZA_EDIT,
  field,
  value,
  price,
});

export const customPizzaValidation = pizzaErrors => ({
  type: CUSTOM_PIZZA_VALIDATION,
  pizzaErrors,
});
