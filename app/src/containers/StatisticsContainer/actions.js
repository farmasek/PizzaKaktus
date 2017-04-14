import { doIt, hosts } from '../../network';
import { Observable } from 'rxjs';
import { FETCH_STATS_GRAPH, FETCH_STATS_FIELDS, STATS_CHANGE_DATE_RANGE } from './constants';
// import { soldNumbers, graphData } from './statisMock';

export const changeDateRange = (field, value) => ({
  type: STATS_CHANGE_DATE_RANGE,
  field,
  value,
});
export const fetchStatsGraph = (startDate, endDate) => ({
  type: FETCH_STATS_GRAPH,
  startDate,
  endDate,
});
export const fetchStatsFields = (startDate, endDate) => ({
  type: FETCH_STATS_FIELDS,
  startDate,
  endDate,
});

export const fetchStatsGraphEpic = (action$) =>
  action$.ofType(FETCH_STATS_GRAPH)
    .switchMap((action) =>
      Observable.ajax(doIt(hosts.pk, `order/statistics/graph?startDate=${
          action.startDate.format('x')}&endDate=${action.endDate.format('x')}`,
        'GET', {}, true))
        .map(payload => ({
          type: `${FETCH_STATS_GRAPH}_FULFILLED`,
          payload: payload.response,
        }))
        .catch(error =>
          Observable.of({
            type: `NOTIF_ADD`,
            notification: {
              message: error.xhr.response,
              barStyle: { color: '#e57373' },
            },
          }))
    );
export const fetchStatsFieldsEpic = (action$) =>
  action$.ofType(FETCH_STATS_FIELDS)
    .switchMap((action) =>
      Observable.ajax(doIt(hosts.pk, `order/statistics/fields?startDate=${
          action.startDate.format('x')}&endDate=${action.endDate.format('x')}`,
        'GET', {}, true))
        .map(payload => ({
          type: `${FETCH_STATS_FIELDS}_FULFILLED`,
          payload: payload.response,
        }))
        .catch(error =>
          Observable.of({
            type: `NOTIF_ADD`,
            notification: {
              message: error.xhr.response,
              barStyle: { color: '#e57373' },
            },
          }))
    );
