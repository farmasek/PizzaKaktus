import {
  FETCH_ORDERS,
  CHECKBOX_STATUS_CHANGE,
} from './constants';
import { Record, Map } from 'immutable';
import { mapOrder } from '../../models/Order';

const InitialState = new Record({
  orders: new Map(),
  checkboxes: new Map(),
  loading: false,
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
    default:
      return state;
  }
};

export default orderReducer;
