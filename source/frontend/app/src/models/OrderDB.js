import { Record, List } from 'immutable';
import { Customer } from './Customer';

export const CREATED = 'CREATED';
export const OPENED = 'OPENED';
export const CLOSED = 'CLOSED';
export const CANCELLED = 'CANCELLED';

export const OrderDB = new Record({
  pizzasId: new List(),
  customer: new Customer(),
  orderStatus: CREATED,
  isActive: true,
});
