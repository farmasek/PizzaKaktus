import {
  ADD_TO_SHOPPING_CART,
  FETCH_SHOPPING_CART,
  REMOVE_FROM_SHOPPING_CART,
  SHOPPING_CART_SNACKBAR,
} from './constants';

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

export const handleSnackbar = (value) => ({
  type: SHOPPING_CART_SNACKBAR,
  value,
});
