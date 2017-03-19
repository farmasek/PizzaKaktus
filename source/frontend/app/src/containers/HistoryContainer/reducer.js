import moment from 'moment';
import {
  ORDER_PAG_PROPERTIES,
  FETCH_ORDER_LIST,
  ORDER_PAG_TIME,
} from './constants';
import { Record, Map, fromJS } from 'immutable';
import { mapOrder } from '../../models/Order';

const InitialState = new Record({
  orders: new Map(),
  loading: false,
  pagination: fromJS({
    totalPages: 0,
    totalElements: 0,
    size: 7,
    number: 0,
    sortDir: 'ASC',
    sortBy: 'id',
    filterAttribute: '',
    filterPhrase: '',
    startDate: moment().subtract(1, 'M'),
    endDate: moment(),
  }),
});

const historyReducer = (state = new InitialState(), action) => {
  switch (action.type) {
    case `${FETCH_ORDER_LIST}`: {
      return state.withMutations(s => s
        .set('loading', true)
      );
    }
    case `${FETCH_ORDER_LIST}_FULFILLED`: {
      const { content, totalPages, totalElements, size, number } = action.response;
      const { direction, property } = action.response.sort ? action.response.sort[0] : null;
      let orders = new Map();
      content.map(order => orders = orders.set(order.id, mapOrder(order)));
      return state.withMutations(s => s
      .setIn(['pagination', 'totalPages'], totalPages)
      .setIn(['pagination', 'totalElements'], totalElements)
      .setIn(['pagination', 'size'], size)
      .setIn(['pagination', 'number'], number)
      .setIn(['pagination', 'sortDir'], direction)
      .setIn(['pagination', 'sortBy'], property)
      .set('orders', orders)
      .set('loading', false));
    }
    case `${FETCH_ORDER_LIST}_FAILED`: {
      return state.withMutations(s => s
        .set('orders', new Map())
        .set('loading', false)
      );
    }
    case `${ORDER_PAG_PROPERTIES}`: {
      let sortDir = state.getIn(['pagination', 'sortDir']);
      if (action.paginationType === 'sortBy') {
        sortDir = sortDir === 'ASC' ? 'DESC' : 'ASC';
      }
      let value = action.value;
      if (action.paginationType === 'startDate') {
        value = moment(value);
      }
      if (action.paginationType === 'endDate') {
        value = moment(value);
      }
      if (action.paginationType !== 'number') {
        return state.withMutations(s => s
          .setIn(['pagination', action.paginationType], value)
          .setIn(['pagination', 'sortDir'], sortDir)
          .setIn(['pagination', 'number'], 0)
        );
      }
      return state.withMutations(s => s
        .setIn(['pagination', action.paginationType], value)
        .setIn(['pagination', 'sortDir'], sortDir)
      );
    }
    case ORDER_PAG_TIME: {
      const field = action.field;
      const value = moment(action.value);
      let final;
      if (field === 'startDate') {
        const current = state.getIn(['pagination', 'startDate']);
        const hour = value.get('hour');
        const minute = value.get('minute');
        final = current.set({ hour, minute });
        return state.setIn(['pagination', 'startDate'], final);
      }
      const current = state.getIn(['pagination', 'endDate']);
      const hour = value.get('hour');
      const minute = value.get('minute');
      final = current.set({ hour, minute });
      return state.setIn(['pagination', 'endDate'], final);
    }
    default:
      return state;
  }
};

export default historyReducer;
