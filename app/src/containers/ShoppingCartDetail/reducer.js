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
} from './constants';
import { Record, Map, fromJS } from 'immutable';
import {
  Customer,
  mapCustomer,
} from '../../models/Customer';

const InitialState = new Record({
  shoppingCart: new Map(),
  cartIngredients: new Map(),
  dialog: {
    showDialog: false,
  },
  customer: new Customer(),
  customerError: new Customer(),
  isLoading: false,
  active: false,
  selected: 0,
});

const shoppingCartReducer =
  (state = new InitialState(), action) => {
    switch (action.type) {
      case FETCH_SHOPPING_CART: {
        const localShoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
          || [];
        let cartIngredients = new Map();
        let cart = new Map();
        if (localShoppingCart.length > 0) {
          for (let i = 0; i < localShoppingCart.length; i++) {
            cartIngredients = cartIngredients.set(i, fromJS(localShoppingCart[i].ingredientsId));
            cart = cart.set(i, localShoppingCart[i]);
          }
        }
        return state.withMutations(s => s
          .set('shoppingCart', cart)
          .set('cartIngredients', cartIngredients)
          .set('dialog', { showDialog: false })
        );
      }
      case ADD_TO_SHOPPING_CART: {
        let shoppingCartWithAdded = state.get('shoppingCart');
        const index = shoppingCartWithAdded.size;
        shoppingCartWithAdded = shoppingCartWithAdded.set(index, action.pizza);
        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCartWithAdded.toIndexedSeq()));
        const cartIngredients = state
          .get('cartIngredients')
          .set(index, fromJS(action.pizza.ingredientsId));
        return state.withMutations(s => s
          .set('shoppingCart', shoppingCartWithAdded)
          .set('cartIngredients', cartIngredients)
        );
      }
      case REMOVE_FROM_SHOPPING_CART: {
        const shoppingCartWithRemoved = state.get('shoppingCart').delete(action.index);
        localStorage.setItem('shoppingCart',
          JSON.stringify(shoppingCartWithRemoved.toIndexedSeq()));
        const cartIngredients = state.get('cartIngredients').delete(action.index);
        return state.withMutations(s => s
          .set('shoppingCart', shoppingCartWithRemoved)
          .set('cartIngredients', cartIngredients)
        );
      }
      case EMPTY_SHOPPING_CART: {
        localStorage.setItem('shoppingCart', JSON.stringify([]));
        return state.withMutations(s => s
          .set('shoppingCart', new Map())
          .set('cartIngredients', new Map())
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
        let cartIngredients = state.get('cartIngredients');
        let pizzasIngredients = fromJS(cartIngredients.get(action.index));
        if (pizzasIngredients.contains(action.ingredientId)) {
          pizzasIngredients = pizzasIngredients
            .delete(pizzasIngredients.indexOf(action.ingredientId));
        } else {
          pizzasIngredients = pizzasIngredients.push(action.ingredientId);
        }
        cartIngredients = cartIngredients.set(action.index, pizzasIngredients);
        return state.set('cartIngredients', cartIngredients);
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
      default:
        return state;
    }
  };

export default shoppingCartReducer;
