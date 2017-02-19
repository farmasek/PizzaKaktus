import { Record, List } from 'immutable';
import { Customer, mapCustomer } from './Customer';

export const OrderDTO = new Record({
  pizzasId: new List(),
  customer: new Customer(),
});

export const mapOrderDTO = (pizzasId, customer) => {
  let ids = new List();
  for (let i = 0; i < pizzasId.length; i++) {
    ids = ids.push(pizzasId[i].id);
  }
  return new OrderDTO({
    pizzasId: ids,
    customer: mapCustomer(customer),
  });
};
