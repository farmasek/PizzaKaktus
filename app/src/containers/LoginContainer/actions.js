import { Observable } from 'rxjs';
import { browserHistory } from 'react-router';
import { hosts, doIt, setToken, removeToken } from '../../network';
import {
  LOGIN_DIALOG,
  LOGIN_FORM_CHANGE,
  LOGIN,
  LOGOUT,
  LOGIN_FORM_ERRORS,
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
    Observable.ajax(doIt(hosts.auth, '/token', 'POST', action.body))
    .do((payload) => {
      setToken(payload.response);
    })
    .map(payload => ({
      type: `${LOGIN}_FULFILLED`,
      payload: payload.response,
    }))
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

export const logout = () => ({
  type: LOGOUT,
});

export const logoutEpic = action$ =>
  action$.ofType(LOGOUT)
  .switchMap(() => Observable.ajax(doIt(
    hosts.auth,
    'sign-out',
    'GET',
    {},
  ))
  .map(() => {
    removeToken();
    browserHistory.push('/');
    return {
      type: `${LOGOUT}_FULFILLED`,
    };
  }))
  .catch(() => {
    removeToken();
    browserHistory.push('/');
    return Observable.of({
      type: `${LOGOUT}_FULFILLED`,
    });
  });
