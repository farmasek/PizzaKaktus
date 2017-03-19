import {
} from './constants';
import { Record, Map } from 'immutable';

const InitialState = new Record({
  orders: new Map(),
  loading: false,
});

const orderReducer = (state = new InitialState(), action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default orderReducer;
