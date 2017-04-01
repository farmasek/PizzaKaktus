import { Record, Map, fromJS, List } from 'immutable';
import { Pizza, mapPizza } from './Pizza';

export const CartItem = new Record({
  pizza: new Pizza(),
  ingredientsIds: new List(),
});

export const mapCartItem = (cartItem) => new CartItem({
  pizza: mapPizza(cartItem.pizza),
  ingredientsIds: fromJS(cartItem.ingredientsIds),
});

export const mapCartItemData = (pizza, ingredientsIds) => new CartItem({
  pizza: mapPizza(pizza),
  ingredientsIds: fromJS(ingredientsIds),
});

export const mapCart = (local) => {
  const localCart = fromJS(local);
  let cart = new Map();
  if (localCart) {
    localCart.forEach((value, key) => {
      cart = cart.set(parseInt(key, 10), mapCartItem(JSON.parse(JSON.stringify(value))));
    });
  }
  return cart;
};
