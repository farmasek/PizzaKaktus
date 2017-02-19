import {
  ADD_TO_SHOPPING_CART,
  FETCH_SHOPPING_CART,
  REMOVE_FROM_SHOPPING_CART,
  EMPTY_SHOPPING_CART,
  SHOPPING_CART_DIALOG,
  CART_CUSTOMER_EDIT,
  CART_CUSTOMER_ERROR_EDIT,
} from './constants';
import { Record } from 'immutable';
import { Customer } from '../../models/Customer';

const InitialState = new Record({
  shoppingCart: [],
  dialog: {
    showDialog: false,
  },
  customer: new Customer(),
  customerError: new Customer(),
});

const shoppingCartReducer =
  (state = new InitialState(), action) => {
    switch (action.type) {
      case FETCH_SHOPPING_CART: {
        const localShoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
          || [];
        return state.withMutations(s => s
          .set('shoppingCart', localShoppingCart)
          .set('dialog', { showDialog: false })
        );
      }
      case ADD_TO_SHOPPING_CART: {
        const shoppingCartWithAdded = state.get('shoppingCart');
        shoppingCartWithAdded.push(action.pizza);
        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCartWithAdded));
        return state.withMutations(s => s
          .set('shoppingCart', shoppingCartWithAdded)
        );
      }
      case REMOVE_FROM_SHOPPING_CART: {
        const shoppingCartWithRemoved = state.get('shoppingCart').slice();
        const indexToRemove = shoppingCartWithRemoved.indexOf(action.pizza);
        shoppingCartWithRemoved.splice(indexToRemove, 1);
        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCartWithRemoved));
        return state.withMutations(s => s
          .set('shoppingCart', shoppingCartWithRemoved)
        );
      }

      case EMPTY_SHOPPING_CART: {
        localStorage.setItem('shoppingCart', JSON.stringify([]));
        return state.withMutations(s => s
          .set('shoppingCart', [])
          .set('customer', new Customer())
          .set('customerError', new Customer())
        );
      }
      case SHOPPING_CART_DIALOG: {
        return state.set('dialog', action.dialog);
      }
      case CART_CUSTOMER_EDIT: {
        return state.setIn(['customer', action.field], action.value);
      }
      case CART_CUSTOMER_ERROR_EDIT: {
        if (action.field === 'resetator') {
          return state.set('customerError', new Customer());
        }
        return state.setIn(['customerError', action.field], action.value);
      }
      default:
        return state;
    }
  };

export default shoppingCartReducer;
