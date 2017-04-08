import {
  ADD_TO_SHOPPING_CART,
  FETCH_SHOPPING_CART,
  REMOVE_FROM_SHOPPING_CART,
  EMPTY_SHOPPING_CART,
  SHOPPING_CART_DIALOG,
  CART_CUSTOMER_EDIT,
  CART_CUSTOMER_ERROR_EDIT,
  CHANGE_PIZZA_INGREDIENTS,
  TOGGLE_EDIT_INGREDIENTS_DIALOG,
  SELECT_PIZZA_TO_EDIT_INGREDIENTS,
  SEND_ORDER,
} from './constants';
import { Record, Map, fromJS } from 'immutable';
import { Customer, mapCustomer } from '../../models/Customer';
import {
  mapCart,
  mapCartItemData,
} from '../../models/CartItem';

const InitialState = new Record({
  cart: new Map(),
  dialog: {
    showDialog: false,
  },
  customer: new Customer(),
  customerError: new Customer(),
  isLoading: false,
  active: false,
  selected: 0,
  sending: false,
});

const shoppingCartReducer =
  (state = new InitialState(), action) => {
    switch (action.type) {
      case FETCH_SHOPPING_CART: {
        const cart = mapCart(JSON.parse(localStorage.getItem('cart'))) || new Map();
        return state.withMutations(s => s
          .set('cart', cart)
          .set('dialog', { showDialog: false })
        );
      }
      case ADD_TO_SHOPPING_CART: {
        let cart = state.get('cart');
        const i = cart.size;
        cart = cart.set(i, mapCartItemData(action.pizza, fromJS(action.pizza.ingredientsId)));
        localStorage.setItem('cart', JSON.stringify(cart));
        return state.withMutations(s => s
          .set('cart', cart)
        );
      }
      case REMOVE_FROM_SHOPPING_CART: {
        const cart = state.get('cart').delete(action.index);
        localStorage.setItem('cart', JSON.stringify(cart));
        return state.withMutations(s => s
          .set('cart', cart)
        );
      }
      case EMPTY_SHOPPING_CART: {
        localStorage.setItem('cart', JSON.stringify([]));
        return state.withMutations(s => s
          .set('cart', new Map())
          .set('customer', new Customer())
          .set('customerError', new Customer())
        );
      }
      case SHOPPING_CART_DIALOG: {
        return state.set('dialog', action.dialog);
      }
      case CART_CUSTOMER_EDIT: {
        return action.field === 'email'
          ? state.setIn(['customer', action.field], action.value).set('isLoading', true)
          : state.setIn(['customer', action.field], action.value);
      }
      case `${CART_CUSTOMER_EDIT}_FAILED`: {
        return state.set('isLoading', false);
      }
      case `${CART_CUSTOMER_EDIT}_prefill`: {
        return state.set('customer', mapCustomer(action.response)).set('isLoading', false);
      }
      case CART_CUSTOMER_ERROR_EDIT: {
        if (action.field === 'resetator') {
          return state.set('customerError', new Customer());
        }
        return state.setIn(['customerError', action.field], action.value);
      }
      case CHANGE_PIZZA_INGREDIENTS: {
        const index = action.index;
        let cart = state.get('cart');
        let cartItem = fromJS(state.get('cart').get(index));
        let ingredients = fromJS(cartItem.get('ingredientsIds'));
        if (ingredients.includes(action.ingredientId)) {
          ingredients = ingredients.delete(ingredients.indexOf(action.ingredientId));
        } else {
          ingredients = ingredients.push(action.ingredientId);
        }
        cartItem = cartItem.set('ingredientsIds', ingredients);
        cart = cart.set(index, cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        return state.withMutations(s => s
          .set('cart', cart));
      }
      case TOGGLE_EDIT_INGREDIENTS_DIALOG: {
        return state.set('active', !state.get('active'));
      }
      case SELECT_PIZZA_TO_EDIT_INGREDIENTS: {
        return state.withMutations(s => s
          .set('active', true)
          .set('selected', action.index)
        );
      }
      case SEND_ORDER: {
        return state.set('sending', true);
      }
      case `${SEND_ORDER}_FULFILLED`: {
        return state.set('sending', false);
      }
      case `${SEND_ORDER}_REJECTED`: {
        return state.set('sending', false);
      }
      default:
        return state;
    }
  };

export default shoppingCartReducer;
