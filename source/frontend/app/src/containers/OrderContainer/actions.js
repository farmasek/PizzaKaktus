import {
  FETCH_ORDERS,
  CHECKBOX_STATUS_CHANGE,
  CHANGE_ORDER_STATUSES,
} from './constants';
import { doIt, hosts } from '../../network';
import { Observable } from 'rxjs';
import { FETCH_PIZZA_LIST } from '../PizzaContainer/constants';

export const fetchOrders = () => ({
  type: FETCH_ORDERS,
});

export const fetchOrdersEpic = action$ =>
  action$.ofType(FETCH_ORDERS)
  .mergeMap(() =>
    Observable.ajax(doIt(hosts.pk, 'order/all-opened-orders', 'GET', {}))
    .switchMap(payload => [
      {
        type: `${FETCH_ORDERS}_FULFILLED`,
        payload: payload.response,
      },
      {
        type: FETCH_PIZZA_LIST,
      },
    ])
    .catch(error =>
      Observable.of({
        type: `NOTIF_ADD`,
        notification: {
          message: error.xhr.response
            ? error.xhr.response.message
            : 'Nastala neočekáváná chyba při získávání objednávek.',
          barStyle: { color: '#e57373' },
        },
      }))
  );

export const orderCheckboxChange = (id, checked) => ({
  type: CHECKBOX_STATUS_CHANGE,
  id,
  checked,
});

export const changeOrderStatuses = (changes) => ({
  type: CHANGE_ORDER_STATUSES,
  changes,
});

export const changeOrderStatusesEpic = action$ =>
  action$.ofType(CHANGE_ORDER_STATUSES)
  .mergeMap(action =>
    Observable.ajax(doIt(hosts.pk, 'order/change-order-status', 'POST', action.changes, true))
    .switchMap(() => [
      {
        type: `${CHANGE_ORDER_STATUSES}_FULFILLED`,
      },
      {
        type: FETCH_ORDERS,
      },
    ])
    .catch(error =>
      Observable.of({
        type: `NOTIF_ADD`,
        notification: {
          message: error.xhr.response
            ? error.xhr.response.message
            : 'Nastala neočekáváná chyba během změny stavů objednávek.',
          barStyle: { color: '#e57373' },
        },
      }))
  );
