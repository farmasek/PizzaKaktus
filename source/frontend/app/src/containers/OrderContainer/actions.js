import {
  FETCH_ORDER_LIST,
  ORDER_PAG_PROPERTIES,
} from './constants';
import { doIt, hosts } from '../../network';
import { Observable } from 'rxjs';

export const fetchOrderList = () => ({
  type: FETCH_ORDER_LIST,
});

const fetchOrderTable = pagination =>
  Observable.ajax(doIt(hosts.pk, `order/all-orders?page=${
    pagination.get('number')
    }&size=${
    pagination.get('size')
    }&sort=${
    pagination.get('sortBy')
    },${
    pagination.get('sortDir')
    }&filterAttribute=${
    pagination.get('filterAttribute')
    }&filterPhrase=${
    pagination.get('filterPhrase')
    }&filterStartDate=${
    pagination.get('startDate').format('x')
    }&filterEndDate=${
    pagination.get('endDate').format('x')
    }`, 'GET', {}))
  .map(({ response }) => ({
    type: `${FETCH_ORDER_LIST}_FULFILLED`,
    response,
  }))
  .catch(error =>
    Observable.of({
      type: `NOTIF_ADD`,
      notification: {
        message: error.xhr.response ? error.xhr.response.message : 'Nastala neočekáváná chyba.',
        barStyle: { color: '#e57373' },
      },
    })
  );

export const fetchOrderListEpic = (action$, store) =>
  action$.ofType(FETCH_ORDER_LIST)
  .map(() => store.getState().orderContainer.get('pagination'))
  .switchMap((pagination) => fetchOrderTable(pagination)
  );

export const fetchOrdersAfterPaginationChange = (action$, store) =>
  action$.ofType(ORDER_PAG_PROPERTIES)
  .debounceTime(250)
  .map(() => store.getState().orderContainer.get('pagination'))
  .switchMap((pagination) => fetchOrderTable(pagination)
  );

export const changePaginationProperties = (paginationType, value) => ({
  type: ORDER_PAG_PROPERTIES,
  paginationType,
  value,
});
