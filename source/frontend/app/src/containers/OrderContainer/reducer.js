import {
  FETCH_ORDERS,
  CHECKBOX_STATUS_CHANGE,
  CANCEL_ORDER_DIALOG,
  PICK_ORDER_CANCEL,
  CHANGE_ORDER_STATUSES,
} from './constants';
import { Record, Map } from 'immutable';
import { Order, mapOrder } from '../../models/Order';

const InitialState = new Record({
  orders: new Map(),
  checkboxes: new Map(),
  loading: false,
  dialog: false,
  cancel: new Order(),
});

const orderReducer = (state = new InitialState(), action) => {
  switch (action.type) {
    case FETCH_ORDERS: {
      return state.withMutations(s => s
      .set('loading', true)
      .set('orders', new Map())
      .set('checkboxes', new Map()));
    }
    case `${FETCH_ORDERS}_FULFILLED`: {
      let orders = new Map();
      let checkboxes = new Map();
      action.payload.map(order => {
        orders = orders.set(order.id, mapOrder(order));
        checkboxes = checkboxes.set(order.id, false);
      });
      return state.withMutations(s => s
      .set('loading', false)
      .set('orders', orders)
      .set('checkboxes', checkboxes));
    }
    case CHECKBOX_STATUS_CHANGE: {
      return state.setIn(['checkboxes', action.id], action.checked);
    }
    case `${CHANGE_ORDER_STATUSES}_FULFILLED`: {
      return state.withMutations(s => s
      .set('cancel', new Order())
      .set('dialog', false));
    }
    case CANCEL_ORDER_DIALOG: {
      return state.set('dialog', !state.get('dialog'));
    }
    case PICK_ORDER_CANCEL: {
      return state.withMutations(s => s
        .set('cancel', action.order)
        .set('dialog', true));
    }
    default:
      return state;
  }
};

export default orderReducer;
