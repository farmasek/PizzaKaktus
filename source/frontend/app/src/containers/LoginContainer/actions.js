import { Observable } from 'rxjs';
import { hosts, doIt, setToken } from '../../network';
import {
  LOGIN_DIALOG,
  LOGIN_FORM_CHANGE,
  LOGIN,
  LOGIN_FORM_ERRORS,
  SET_USER,
  LOGOUT,
} from './constants';

export const toggleDialog = () => ({
  type: LOGIN_DIALOG,
});

export const loginChange = (name, value) => ({
  type: LOGIN_FORM_CHANGE,
  name,
  value,
});

export const setLoginErrors = (loginErrors) => ({
  type: LOGIN_FORM_ERRORS,
  loginErrors,
});

export const login = (username, password) => ({
  type: LOGIN,
  body: {
    grant_type: 'password',
    username,
    password,
  },
});

export const loginEpic = action$ =>
  action$.ofType(LOGIN)
  .mergeMap(action => Observable.merge(
    Observable.ajax(doIt(hosts.pk, 'oauth/token', 'POST', action.body))
    .do((payload) => {
      setToken(payload.response);
    })
    .switchMap(payload => [
      {
        type: `${LOGIN}_FULFILLED`,
        login: action.body.username,
        payload: payload.response,
      },
    ])
    .catch(error => Observable.of({
      type: `${LOGIN}_REJECTED`,
      payload: error.xhr.response
        ? error.xhr.response.error_description
        : 'Could not establish connection.',
    })))
  .startWith({
    type: `${LOGIN}_PENDING`,
  }))
  .catch(error => Observable.of({
    type: `${LOGIN}_REJECTED`,
    payload: error.xhr.response
      ? error.xhr.response.error_description
      : 'Could not establish connection.',
  }));

export const loggedInEpic = action$ =>
  action$.ofType(`${LOGIN}_FULFILLED`)
  .mergeMap((action) => Observable.ajax(doIt(hosts.pk, `user/by-login/${action.login}`, 'GET', {}))
  .map(payload => ({
    type: SET_USER,
    user: payload.response,
  })));

export const logout = () => ({
  type: LOGOUT,
});
