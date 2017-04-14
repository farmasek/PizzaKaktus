import moment from 'moment';
import { FETCH_STATS_FIELDS, STATS_CHANGE_DATE_RANGE, FETCH_STATS_GRAPH } from './constants';
import { Record, List } from 'immutable';

const InitialState = new Record({
  startDate: moment().subtract(1, 'months'),
  endDate: moment(),
  ordersGraph: new List(),
  soldPizzaCount: 0,
  soldPizzaMoney: 0,
  mostSoldPizza: '',
});

const statisticsReducer = (state = new InitialState(), action) => {
  switch (action.type) {
    case STATS_CHANGE_DATE_RANGE: {
      return state.set(action.field, moment(action.value));
    }
    case `${FETCH_STATS_FIELDS}_FULFILLED`: {
      const { soldPizzaCount, soldPizzaMoney, mostSoldPizza } = action.payload;
      return state.withMutations(s =>
        s.set('soldPizzaCount', soldPizzaCount)
          .set('soldPizzaMoney', soldPizzaMoney)
          .set('mostSoldPizza', mostSoldPizza)
      );
    }
    case `${FETCH_STATS_GRAPH}_FULFILLED`: {
      let ordersGraph = new List();
      const data = action.payload || [];
      data.forEach(item => ordersGraph = ordersGraph.push({
        day: moment(item.day).format('DD.MM'),
        sold: item.sold,
      }));
      return state.set('ordersGraph', ordersGraph);
    }
    default:
      return state;
  }
};

export default statisticsReducer;
