import {
  ADD_TO_SHOPPING_CART,
  FETCH_SHOPPING_CART,
  REMOVE_FROM_SHOPPING_CART,
  EMPTY_SHOPPING_CART,
  SHOPPING_CART_DIALOG,
  CART_CUSTOMER_EDIT,
  CART_CUSTOMER_ERROR_EDIT,
  SEND_ORDER,
  CHANGE_PIZZA_INGREDIENTS,
  TOGGLE_EDIT_INGREDIENTS_DIALOG,
  SELECT_PIZZA_TO_EDIT_INGREDIENTS,
} from './constants';
import { mapOrderData } from '../../models/Order';
import { doIt, hosts } from '../../network';
import { Observable } from 'rxjs';

export const editCustomerField = (field, value) => ({
  type: CART_CUSTOMER_EDIT,
  field,
  value,
});

export const editCustomerErrorField = (field, value) => ({
  type: CART_CUSTOMER_ERROR_EDIT,
  field,
  value,
});

export const fetchShoppingCart = () => ({
  type: FETCH_SHOPPING_CART,
});

export const addToShoppingCart = (pizza) => ({
  type: ADD_TO_SHOPPING_CART,
  pizza,
});

export const removeFromShoppingCart = (index) => ({
  type: REMOVE_FROM_SHOPPING_CART,
  index,
});

export const emptyShoppingCart = () => ({
  type: EMPTY_SHOPPING_CART,
});

export const handleDialog = (showDialog) => ({
  type: SHOPPING_CART_DIALOG,
  dialog: {
    showDialog,
  },
});

export const sendOrder = (pizzasIds, customer) => ({
  type: SEND_ORDER,
  pizzasIds,
  customer,
});

export const sendOrderEpic = (action$) =>
  action$.ofType(SEND_ORDER)
    .switchMap((action) =>
      Observable.ajax(doIt(
        hosts.pk,
        'order/create-order',
        'POST',
        JSON.stringify(mapOrderData(action.pizzasIds, action.customer)),
        true,
      )).switchMap(() => ([
        {
          type: EMPTY_SHOPPING_CART,
        },
        {
          type: `NOTIF_ADD`,
          notification: {
            message: 'Objednávka odeslána.',
          },
        },
      ]))
        .catch(error =>
          Observable.of({
            type: `NOTIF_ADD`,
            notification: {
              message: error.xhr.response
                ? error.xhr.response.message
                : 'Nastala neočekávaná chyba.',
              barStyle: { color: '#e57373' },
            },
          }))
    );

export const prefillByEmailEpic = (action$, store) =>
  action$.ofType(CART_CUSTOMER_EDIT)
    .filter(() => store.getState().shoppingCartContainer.customer.get('preFill'))
    .filter(({ field }) => field === 'email')
    .debounceTime(500)
    .switchMap(() =>
      Observable.ajax(doIt(
        hosts.pk,
        `customer/by-email?email=${store.getState().shoppingCartContainer.customer.get('email')}`,
        'GET',
        {},
        false,
      ))
        .switchMap(({ response }) => ([
          {
            type: `${CART_CUSTOMER_EDIT}_prefill`,
            response,
          },
        ]))
        .catch(() =>
          Observable.of({
            type: `${CART_CUSTOMER_EDIT}_FAILED`,
          }))
    );

export const showAddedNotification = (action) =>
  action.ofType(ADD_TO_SHOPPING_CART)
    .map(() => ({
      type: `NOTIF_ADD`,
      notification: {
        message: 'Pizza přidána do košíku.',
      },
    }));

export const showRemovePizzaNotification = (action) =>
  action.ofType(REMOVE_FROM_SHOPPING_CART)
    .map(() => ({
      type: `NOTIF_ADD`,
      notification: {
        message: 'Pizza byla odebrána z košíku.',
      },
    }));

export const changePizzaIngredients = (index, ingredientId) => ({
  type: CHANGE_PIZZA_INGREDIENTS,
  index,
  ingredientId,
});

export const toggleDialog = () => ({
  type: TOGGLE_EDIT_INGREDIENTS_DIALOG,
});

export const selectPizzaToEditIngredients = (index) => ({
  type: SELECT_PIZZA_TO_EDIT_INGREDIENTS,
  index,
});
