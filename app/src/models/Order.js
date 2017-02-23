import { Record, List } from 'immutable';
import { Customer, mapCustomer } from './Customer';

export const Order = new Record({
  id: null,
  pizzasIds: new List(),
  customer: new Customer(),
});

export const mapOrder = src => new Order({
  id: src.id,
  pizzasIds: src.pizzasIds,
  customer: src.customer,
});

export const mapOrderData = (pizzasIds, customer) => {
  let ids = new List();
  for (let i = 0; i < pizzasIds.length; i++) {
    ids = ids.push(pizzasIds[i].id);
  }
  return new Order({
    id: '',
    pizzasIds: ids,
    customer: mapCustomer(customer),
  });
};
