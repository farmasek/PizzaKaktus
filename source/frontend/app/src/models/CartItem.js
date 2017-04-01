import { Record, Map, fromJS } from 'immutable';
import { Pizza } from './Pizza';

export const CartItem = new Record({
  pizza: new Pizza(),
  ingredientsIds: [],
});

export const mapCartItem = (cartItem) => new CartItem({
  pizza: cartItem.pizza,
  ingredientsIds: cartItem.ingredientsIds,
});

export const mapCartItemData = (pizza, ingredientsIds) => new CartItem({
  pizza,
  ingredientsIds,
});

export const mapOrderItem = (cartItem) => new Record({
  pizzaId: cartItem.pizza.id,
  ingredientsIds: cartItem.ingredientsIds,
});

export const mapCart = (local) => {
  const localCart = fromJS(local);
  let cart = new Map();
  localCart.forEach((value, key) => {
    cart = cart.set(parseInt(key, 10), mapCartItem(JSON.parse(JSON.stringify(value))));
  });
  return cart;
};
