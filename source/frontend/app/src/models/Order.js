import { Record, List } from 'immutable';
import moment from 'moment';
import { mapCustomer } from './Customer';

const CREATED = 'CREATED';
const OPENED = 'OPENED';
const CLOSED = 'CLOSED';
const CANCELLED = 'CANCELLED';
export const statuses = { CREATED, OPENED, CLOSED, CANCELLED };

export const Order = new Record({
  id: null,
  orderStatus: CREATED,
  pizzasIds: new List(),
  customer: null,
  dateCreated: null,
  dateModified: null,
});

export const mapOrderStatus = (orderStatus) => {
  switch (orderStatus) {
    case CREATED: return 'Vytvořeno';
    case OPENED: return 'Otevřeno';
    case CLOSED: return 'Uzavřeno';
    case CANCELLED: return 'Zrušeno';
    default: return 'Vytvořeno';
  }
};

export const mapOrder = src => {
  const created = moment(src.dateCreated).format('DD.MM.YYYY H:mm:ss');
  const modified = moment(src.dateModified).format('DD.MM.YYYY H:mm:ss');
  return new Order({
    id: src.id,
    // orderStatus: mapOrderStatus(src.orderStatus),
    orderStatus: src.orderStatus,
    pizzasIds: src.pizzasIds,
    customer: src.customer,
    dateCreated: created,
    dateModified: modified,
  });
};

export const mapOrderData = (pizzasIds, customer) => {
  let ids = new List();
  for (let i = 0; i < pizzasIds.length; i++) {
    ids = ids.push(pizzasIds[i].id);
  }
  return new Order({
    id: '',
    orderStatus: CREATED,
    pizzasIds: ids,
    customer: mapCustomer(customer),
    dateCreated: '',
    dateModified: '',
  });
};
