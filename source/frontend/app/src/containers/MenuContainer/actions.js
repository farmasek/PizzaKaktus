import {
  FETCH_MENU,
} from './constants';
import { doIt, hosts } from '../../network';
import { Observable } from 'rxjs';

export const fetchMenu = () => ({
  type: FETCH_MENU,
});

export const fetchMenuEpic = action$ =>
  action$.ofType(FETCH_MENU)
  .switchMap(() =>
    Observable.ajax(doIt(hosts.pk, 'pizza/active-pizzas', 'GET', {}))
    .map(({ response }) => ({
      type: `${FETCH_MENU}_FULFILLED`,
      menu: response,
    }))
    .catch(error =>
      Observable.of({
        type: `${FETCH_MENU}_FAILED`,
        menuError: error.xhr.response,
      }))
  );
