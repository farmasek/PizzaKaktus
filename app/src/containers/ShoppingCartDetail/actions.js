import {
  ADD_TO_SHOPPING_CART,
  FETCH_SHOPPING_CART,
  REMOVE_FROM_SHOPPING_CART,
  EMPTY_SHOPPING_CART,
  SHOPPING_CART_DIALOG,
  CART_CUSTOMER_EDIT,
  CART_CUSTOMER_ERROR_EDIT,
} from './constants';

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

export const removeFromShoppingCart = (pizza) => ({
  type: REMOVE_FROM_SHOPPING_CART,
  pizza,
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

export const showAddedNotification = (action) =>
  action.ofType(ADD_TO_SHOPPING_CART)
    .map(() => ({
      type: `NOTIF_ADD`,
      notification: {
        message: 'Pizza přidána do košíku',
      },
    }));
export const showRemovePizzaNotification = (action) =>
  action.ofType(REMOVE_FROM_SHOPPING_CART)
    .map(() => ({
      type: `NOTIF_ADD`,
      notification: {
        message: 'Pizza byla odebrána z košíku',
      },
    }));
