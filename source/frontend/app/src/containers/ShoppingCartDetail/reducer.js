import {
  ADD_TO_SHOPPING_CART,
  FETCH_SHOPPING_CART,
  REMOVE_FROM_SHOPPING_CART,
  SHOPPING_CART_SNACKBAR,
  EMPTY_SHOPPING_CART,
  SHOPPING_CART_DIALOG,
} from './constants';
import { Record } from 'immutable';
import { mapSnackbar } from '../../models/Snackbar';

const initialSnackbar = mapSnackbar(false, '', '');

const InitialState = new Record({
  shoppingCart: new Array(),
  snackbar: initialSnackbar,
  dialog: {
    showDialog: false,
  },
});

const shoppingCartReducer =
  (state = new InitialState(), action) => {
    switch (action.type) {
      case FETCH_SHOPPING_CART: {
        const localShoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
          || new Array();
        return state.withMutations(s => s
          .set('shoppingCart', localShoppingCart)
          .set('snackbar', initialSnackbar)
          .set('dialog', { showDialog: false })
        );
      }
      case ADD_TO_SHOPPING_CART: {
        const shoppingCartWithAdded = state.get('shoppingCart');
        shoppingCartWithAdded.push(action.pizza);
        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCartWithAdded));
        return state.withMutations(s => s
          .set('shoppingCart', shoppingCartWithAdded)
          .set('snackbar', mapSnackbar(true, 'info', 'Pizza byla úspěšně přidána do košíku.'))
        );
      }
      case REMOVE_FROM_SHOPPING_CART: {
        const shoppingCartWithRemoved = state.get('shoppingCart').slice();
        const indexToRemove = shoppingCartWithRemoved.indexOf(action.pizza);
        shoppingCartWithRemoved.splice(indexToRemove, 1);
        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCartWithRemoved));
        return state.withMutations(s => s
          .set('shoppingCart', shoppingCartWithRemoved)
          .set('snackbar', mapSnackbar(true, 'info', 'Pizza byla úspěšně odebrána z košíku.'))
        );
      }
      case SHOPPING_CART_SNACKBAR: {
        return state.withMutations(s => s
        .setIn(['snackbar', 'showSnackbar'], action.value));
      }
      case EMPTY_SHOPPING_CART: {
        localStorage.setItem('shoppingCart', JSON.stringify(new Array()));
        return state.set('shoppingCart', new Array());
      }
      case SHOPPING_CART_DIALOG: {
        return state.set('dialog', action.dialog);
      }
      default:
        return state;
    }
  };

export default shoppingCartReducer;
