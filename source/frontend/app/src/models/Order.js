import { Record, List } from 'immutable';
import moment from 'moment';
import { mapCustomer } from './Customer';
import { mapOrderCart } from './OrderItem';

const CREATED = 'Vytvořená';
const OPENED = 'Otevřená';
const CLOSED = 'Zavřená';
const CANCELLED = 'Stornována';
export const statuses = { CREATED, OPENED, CLOSED, CANCELLED };

export const Order = new Record({
  id: null,
  orderStatus: CREATED,
  orderCart: new List(),
  customer: null,
  dateCreated: null,
  dateModified: null,
});

export const mapOrder = src => {
  const created = moment(src.dateCreated).format('DD.MM.YYYY H:mm:ss');
  const modified = moment(src.dateModified).format('DD.MM.YYYY H:mm:ss');
  return new Order({
    id: src.id,
    // orderStatus: mapOrderStatus(src.orderStatus),
    orderStatus: src.orderStatus,
    orderCart: src.orderCart,
    customer: src.customer,
    dateCreated: created,
    dateModified: modified,
  });
};

export const mapOrderData = (orderCart, customer) => new Order({
  id: '',
  orderStatus: CREATED,
  orderCart: mapOrderCart(orderCart),
  customer: mapCustomer(customer),
  dateCreated: '',
  dateModified: '',
});
