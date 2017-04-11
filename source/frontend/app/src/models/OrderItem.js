import { Record, List, is } from 'immutable';

export const OrderItem = new Record({
  pizzaId: null,
  ingredientsIds: new List(),
});

export const mapOrderItem = (cartItem) => new OrderItem({
  pizzaId: cartItem.pizza.id ? cartItem.pizza.id : null,
  ingredientsIds: is(cartItem.ingredientsIds, cartItem.pizza.ingredientsId) && cartItem.pizza.id!==null
    ? new List()
    : cartItem.ingredientsIds,
});

export const mapOrderCart = (cart) => {
  let orderCart = new List();
  cart.forEach((value) => orderCart = orderCart.push(mapOrderItem(value)));
  return orderCart;
};
